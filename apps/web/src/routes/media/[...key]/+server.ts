import { readStoredAsset } from '$lib/server/landscape-storage'
import { error } from '@sveltejs/kit'

export async function GET({ params }) {
	if (!params.key) {
		throw error(404, 'Asset not found')
	}

	try {
		const asset = await readStoredAsset(params.key)

		return new Response(asset.bytes, {
			headers: {
				'content-type': asset.contentType,
				'cache-control': 'private, max-age=3600',
			},
		})
	} catch {
		throw error(404, 'Asset not found')
	}
}
