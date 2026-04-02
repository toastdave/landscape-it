import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const dataRoot = new URL('../../../../../.data/', import.meta.url)
const storageRoot = new URL('./storage/', dataRoot)

function normalizeSegment(value: string) {
	return value.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'item'
}

function storagePathFromKey(key: string) {
	return new URL(`./${key}`, storageRoot)
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
	await ensureParentDirectory(key)
	const bytes = new Uint8Array(await file.arrayBuffer())
	await writeFile(storagePathFromKey(key), bytes)
}

export async function storeGeneratedSvg(key: string, svg: string) {
	await ensureParentDirectory(key)
	await writeFile(storagePathFromKey(key), svg, 'utf8')
}

export async function readStoredAsset(key: string) {
	const bytes = await readFile(storagePathFromKey(key))
	const extension = extname(key).toLowerCase()
	const contentTypeByExtension: Record<string, string> = {
		'.svg': 'image/svg+xml',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.jpeg': 'image/jpeg',
		'.webp': 'image/webp',
	}

	return {
		bytes,
		contentType: contentTypeByExtension[extension] ?? 'application/octet-stream',
	}
}
