import { getBillingData } from '$lib/server/landscape-workspace'
import { getOrCreateViewerSession } from '$lib/server/viewer-session'

export async function load(event) {
	const viewer = await getOrCreateViewerSession(event)

	return {
		billing: await getBillingData(viewer),
	}
}
