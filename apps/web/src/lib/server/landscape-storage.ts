import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { getRuntimeEnv, isStorageDriverEnabled } from './runtime'

const dataRoot = new URL('../../../../../.data/', import.meta.url)
const storageRoot = new URL('./storage/', dataRoot)

let cachedS3Client: S3Client | null = null

function normalizeSegment(value: string) {
	return value.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'item'
}

function storagePathFromKey(key: string) {
	return new URL(`./${key}`, storageRoot)
}

function getStorageDriver() {
	return isStorageDriverEnabled('s3') ? 's3' : 'local'
}

function getS3Bucket() {
	const bucket = getRuntimeEnv('S3_BUCKET')

	if (!bucket) {
		throw new Error('S3_BUCKET is required when LANDSCAPE_STORAGE_DRIVER is set to s3')
	}

	return bucket
}

function getS3Client() {
	if (cachedS3Client) {
		return cachedS3Client
	}

	const endpoint = getRuntimeEnv('S3_ENDPOINT')
	const accessKeyId = getRuntimeEnv('S3_ACCESS_KEY')
	const secretAccessKey = getRuntimeEnv('S3_SECRET_KEY')

	if (!endpoint || !accessKeyId || !secretAccessKey) {
		throw new Error('S3 storage requires endpoint, access key, and secret key configuration')
	}

	cachedS3Client = new S3Client({
		region: getRuntimeEnv('S3_REGION', 'us-east-1') ?? 'us-east-1',
		endpoint,
		forcePathStyle: true,
		credentials: {
			accessKeyId,
			secretAccessKey,
		},
	})

	return cachedS3Client
}

function contentTypeFromKey(key: string) {
	const extension = extname(key).toLowerCase()
	const contentTypeByExtension: Record<string, string> = {
		'.svg': 'image/svg+xml',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.jpeg': 'image/jpeg',
		'.webp': 'image/webp',
	}

	return contentTypeByExtension[extension] ?? 'application/octet-stream'
}

async function ensureParentDirectory(key: string) {
	const segments = key.split('/').slice(0, -1)
	const directoryUrl = new URL(`./${segments.join('/')}/`, storageRoot)
	await mkdir(directoryUrl, { recursive: true })
}

export function buildMediaUrl(key: string) {
	return `/media/${key
		.split('/')
		.map((segment) => encodeURIComponent(segment))
		.join('/')}`
}

export function createStorageKey(input: {
	viewerId: string
	projectId: string
	kind: 'source' | 'concept'
	fileName: string
	index?: number
}) {
	const extension = extname(input.fileName) || (input.kind === 'concept' ? '.svg' : '')
	const baseName = normalizeSegment(input.fileName.replace(extension, ''))
	const viewerSegment = normalizeSegment(input.viewerId)
	const projectSegment = normalizeSegment(input.projectId)
	const suffix = input.index ? `-${input.index}` : ''

	return join(
		viewerSegment,
		projectSegment,
		`${input.kind}-${baseName}${suffix}${extension}`
	).replaceAll('\\', '/')
}

export async function storeUploadedPhoto(key: string, file: File) {
	const bytes = new Uint8Array(await file.arrayBuffer())

	if (getStorageDriver() === 's3') {
		await getS3Client().send(
			new PutObjectCommand({
				Bucket: getS3Bucket(),
				Key: key,
				Body: bytes,
				ContentType: file.type || contentTypeFromKey(key),
			})
		)
		return
	}

	await ensureParentDirectory(key)
	await writeFile(storagePathFromKey(key), bytes)
}

export async function storeGeneratedSvg(key: string, svg: string) {
	if (getStorageDriver() === 's3') {
		await getS3Client().send(
			new PutObjectCommand({
				Bucket: getS3Bucket(),
				Key: key,
				Body: svg,
				ContentType: 'image/svg+xml',
			})
		)
		return
	}

	await ensureParentDirectory(key)
	await writeFile(storagePathFromKey(key), svg, 'utf8')
}

export async function deleteStoredAsset(key: string) {
	if (getStorageDriver() === 's3') {
		await getS3Client().send(
			new DeleteObjectCommand({
				Bucket: getS3Bucket(),
				Key: key,
			})
		)
		return
	}

	await rm(storagePathFromKey(key), { force: true })
}

export async function deleteStoredAssets(keys: string[]) {
	await Promise.all(Array.from(new Set(keys)).map((key) => deleteStoredAsset(key)))
}

export async function readStoredAsset(key: string) {
	if (getStorageDriver() === 's3') {
		const response = await getS3Client().send(
			new GetObjectCommand({
				Bucket: getS3Bucket(),
				Key: key,
			})
		)

		if (!response.Body) {
			throw new Error('Asset body missing from object storage response')
		}

		return {
			bytes: Buffer.from(await response.Body.transformToByteArray()),
			contentType: response.ContentType ?? contentTypeFromKey(key),
		}
	}

	const bytes = await readFile(storagePathFromKey(key))

	return {
		bytes,
		contentType: contentTypeFromKey(key),
	}
}
