<script lang="ts">
import { Bookmark, CreditCard, Trees, UserRound } from '@lucide/svelte'

const { data } = $props<{
	data: {
		account: {
			profile: {
				name: string
				email: string
				creditBalance: number
				projectCount: number
				savedConceptCount: number
				savedRecommendationCount: number
			}
			savedConcepts: Array<{
				id: string
				label: string
				caption: string
				project: string
				assetUrl: string
			}>
			savedRecommendations: Array<{
				id: string
				title: string
				project: string
				category: string
				priceLabel: string
				reason: string
			}>
			activity: Array<{
				id: string
				label: string
				detail: string
				amountLabel: string
				dateLabel: string
			}>
		}
	}
}>()
</script>

<svelte:head>
	<title>Landscape It Account</title>
</svelte:head>

<div class="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 py-6 sm:py-8">
	<section class="rounded-[2rem] border border-black/6 bg-white px-5 py-6 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:px-6 sm:py-7">
		<div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
			<div>
				<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Account</p>
				<h1 class="mt-2 text-4xl tracking-[-0.05em] text-[#173323]">Saved concepts and recommendations now persist with the local workspace.</h1>
				<p class="mt-3 max-w-2xl text-sm leading-7 text-[#625d55]">This page is still guest-first for local development, but it now reflects real saved items and credit activity from the working studio flow.</p>
			</div>
			<div class="rounded-[1.6rem] border border-black/8 bg-[#fbf7ef] px-5 py-5 text-center">
				<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6c49]">Credits</p>
				<p class="mt-3 text-4xl tracking-[-0.05em] text-[#173323]">{data.account.profile.creditBalance}</p>
				<p class="mt-1 text-sm text-[#6c665f]">remaining</p>
			</div>
		</div>
	</section>

	<section class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
		<div class="grid gap-6">
			<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<UserRound class="text-[#c47b43]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1e1b18]">Profile snapshot</p>
						<p class="mt-1 text-xs text-[#7a756d]">Ready for future Better Auth wiring without changing the overall page shape.</p>
					</div>
				</div>
				<div class="mt-5 grid gap-3">
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
						<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Name</p>
						<p class="mt-2 text-sm font-medium text-[#173323]">{data.account.profile.name}</p>
					</div>
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
						<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Email</p>
						<p class="mt-2 text-sm font-medium text-[#173323]">{data.account.profile.email}</p>
					</div>
					<div class="grid gap-3 sm:grid-cols-3">
						<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
							<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Projects</p>
							<p class="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#173323]">{data.account.profile.projectCount}</p>
						</div>
						<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
							<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Saved concepts</p>
							<p class="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#173323]">{data.account.profile.savedConceptCount}</p>
						</div>
						<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
							<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Saved picks</p>
							<p class="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#173323]">{data.account.profile.savedRecommendationCount}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<CreditCard class="text-[#c47b43]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1e1b18]">Recent activity</p>
						<p class="mt-1 text-xs text-[#7a756d]">Local ledger activity mirrors what billing history will eventually show with Polar.</p>
					</div>
				</div>
				<div class="mt-5 grid gap-3">
					{#each data.account.activity as entry (entry.id)}
						<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
							<div class="flex items-start justify-between gap-3">
								<div>
									<p class="font-semibold text-[#173323]">{entry.label}</p>
									<p class="mt-1 text-sm text-[#7a756d]">{entry.detail}</p>
									<p class="mt-1 text-xs text-[#7a756d]">{entry.dateLabel}</p>
								</div>
								<p class={`text-sm font-semibold ${entry.amountLabel.startsWith('+') ? 'text-[#20834d]' : 'text-[#173323]'}`}>{entry.amountLabel}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="grid gap-6">
			<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<Trees class="text-[#55725b]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1e1b18]">Saved concepts</p>
						<p class="mt-1 text-xs text-[#7a756d]">Saved directly from the working studio flow.</p>
					</div>
				</div>

				{#if data.account.savedConcepts.length > 0}
					<div class="mt-5 grid gap-4 sm:grid-cols-2">
						{#each data.account.savedConcepts as concept (concept.id)}
							<article class="overflow-hidden rounded-[1.6rem] border border-black/8 bg-[#fbf7ef]">
								<img class="h-40 w-full object-cover" src={concept.assetUrl} alt={`${concept.project} ${concept.label}`} />
								<div class="p-4">
									<p class="text-sm font-semibold text-[#173323]">{concept.label}</p>
									<p class="mt-2 text-sm leading-7 text-[#5f5952]">{concept.caption}</p>
									<p class="mt-3 text-xs uppercase tracking-[0.18em] text-[#8b6c49]">{concept.project}</p>
								</div>
							</article>
						{/each}
					</div>
				{:else}
					<div class="mt-5 rounded-[1.4rem] border border-dashed border-black/10 bg-[#fbf7ef] p-4 text-sm leading-7 text-[#5f5952]">Save concept cards from the studio to build an idea archive here.</div>
				{/if}
			</div>

			<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<Bookmark class="text-[#c47b43]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1e1b18]">Saved recommendations</p>
						<p class="mt-1 text-xs text-[#7a756d]">Useful for collecting likely plant, lighting, and hardscape moves.</p>
					</div>
				</div>

				{#if data.account.savedRecommendations.length > 0}
					<div class="mt-5 grid gap-3">
						{#each data.account.savedRecommendations as recommendation (recommendation.id)}
							<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
								<div class="flex items-start justify-between gap-3">
									<div>
										<p class="font-semibold text-[#173323]">{recommendation.title}</p>
										<p class="mt-1 text-xs uppercase tracking-[0.18em] text-[#8b6c49]">{recommendation.category} - {recommendation.project}</p>
									</div>
									<span class="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#173323]">{recommendation.priceLabel}</span>
								</div>
								<p class="mt-3 text-sm leading-7 text-[#5f5952]">{recommendation.reason}</p>
							</div>
						{/each}
					</div>
				{:else}
					<div class="mt-5 rounded-[1.4rem] border border-dashed border-black/10 bg-[#fbf7ef] p-4 text-sm leading-7 text-[#5f5952]">Save recommendations from the studio to keep a shortlist here.</div>
				{/if}
			</div>
		</div>
	</section>
</div>
