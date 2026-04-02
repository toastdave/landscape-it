<script lang="ts">
import { Bookmark, CreditCard, Trees, UserRound } from '@lucide/svelte'

const { data } = $props<{
	data: {
		account: typeof import('$lib/data/showcase').accountSnapshot
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
				<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Account scaffold</p>
				<h1 class="mt-2 text-4xl tracking-[-0.05em] text-[#173323]">Saved concepts, recommendations, and credits all need one calm place to live.</h1>
				<p class="mt-3 max-w-2xl text-sm leading-7 text-[#625d55]">This page is static for now, but it maps the future consumer account area where homeowners can revisit their favorite outdoor directions.</p>
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
						<p class="mt-1 text-xs text-[#7a756d]">The future signed-in area should stay simple and scan-friendly.</p>
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
						<p class="mt-1 text-xs text-[#7a756d]">Ledger entries and complimentary access should be easy to parse.</p>
					</div>
				</div>
				<div class="mt-5 grid gap-3">
					{#each data.account.activity as entry (entry.label)}
						<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
							<div class="flex items-start justify-between gap-3">
								<div>
									<p class="font-semibold text-[#173323]">{entry.label}</p>
									<p class="mt-1 text-xs text-[#7a756d]">{entry.date}</p>
								</div>
								<p class={`text-sm font-semibold ${entry.amount.startsWith('+') ? 'text-[#20834d]' : 'text-[#173323]'}`}>{entry.amount}</p>
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
						<p class="mt-1 text-xs text-[#7a756d]">These become the homeowner's idea archive over time.</p>
					</div>
				</div>
				<div class="mt-5 grid gap-4 sm:grid-cols-2">
					{#each data.account.savedConcepts as concept (concept.label)}
						<article class="overflow-hidden rounded-[1.6rem] border border-black/8 bg-[#fbf7ef]">
							<div class="h-40 bg-linear-to-br from-[#e5c79d] via-[#98ab80] to-[#455f49]"></div>
							<div class="p-4">
								<p class="text-sm font-semibold text-[#173323]">{concept.label}</p>
								<p class="mt-2 text-sm leading-7 text-[#5f5952]">{concept.caption}</p>
								<p class="mt-3 text-xs uppercase tracking-[0.18em] text-[#8b6c49]">{concept.project}</p>
							</div>
						</article>
					{/each}
				</div>
			</div>

			<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<Bookmark class="text-[#c47b43]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1e1b18]">What this page will evolve into</p>
						<p class="mt-1 text-xs text-[#7a756d]">Future work is already captured in the PRDs.</p>
					</div>
				</div>
				<div class="mt-5 grid gap-3 text-sm leading-7 text-[#5f5952]">
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Saved concept comparison and before/after organization by project.</div>
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Simple saved recommendation shelves for plant, hardscape, and lighting ideas.</div>
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Credit balance, billing history, and regeneration history without cluttering the studio.</div>
				</div>
			</div>
		</div>
	</section>
</div>
