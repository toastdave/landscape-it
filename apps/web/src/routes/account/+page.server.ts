import { getAccountData } from '$lib/server/landscape-workspace'
import { getOrCreateViewerSession } from '$lib/server/viewer-session'

export async function load(event) {
	const viewer = await getOrCreateViewerSession(event)

	return {
		account: await getAccountData(viewer),
	}
}
