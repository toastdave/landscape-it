import { getBillingData, getViewerWorkspacePermissions } from '$lib/server/landscape-workspace'
import { getOrCreateViewerSession } from '$lib/server/viewer-session'
import { redirect } from '@sveltejs/kit'

export async function load(event) {
	const viewer = await getOrCreateViewerSession(event)
	const permissions = await getViewerWorkspacePermissions(viewer)

	if (!permissions.canViewBilling) {
		redirect(303, '/sign-in?reason=billing&next=/billing')
	}

	return {
		billing: await getBillingData(viewer),
	}
}
