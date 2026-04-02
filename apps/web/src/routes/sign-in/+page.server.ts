export async function load({ parent }) {
	const layoutData = await parent()

	return {
		enabledProviders: layoutData.auth.enabledProviders,
	}
}
