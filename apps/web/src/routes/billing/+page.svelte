<script lang="ts">
import { CircleDollarSign, CreditCard, History, ShieldCheck } from '@lucide/svelte'

const { data } = $props<{
	data: {
		billing: {
			creditBalance: number
			creditPacks: Array<{
				id: string
				name: string
				credits: number
				priceLabel: string
				detail: string
				sandboxReady: boolean
			}>
			ledger: Array<{
				id: string
				label: string
				detail: string
				amountLabel: string
				dateLabel: string
			}>
			pricing: {
				analysisCredits: number
				conceptCredits: number
				targetMarginPercent: number
				creditValueCents: number
			}
		}
	}
}>()
</script>

<svelte:head>
	<title>Landscape It Billing</title>
</svelte:head>

<div class="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 py-6 sm:py-8">
	<section class="rounded-[2rem] border border-black/6 bg-white px-5 py-6 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:px-6 sm:py-7">
		<div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
			<div>
				<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Billing</p>
				<h1 class="mt-2 text-4xl tracking-[-0.05em] text-[#173323]">Signed-in billing now reflects the same credit math the studio uses live.</h1>
				<p class="mt-3 max-w-2xl text-sm leading-7 text-[#625d55]">Checkout is still the next integration step, but the pricing model, account balance, and ledger shape are now connected to authenticated usage instead of guest-only scaffolding.</p>
			</div>
			<div class="rounded-[1.6rem] border border-black/8 bg-[#fbf7ef] px-5 py-5 text-center">
				<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6c49]">Available now</p>
				<p class="mt-3 text-4xl tracking-[-0.05em] text-[#173323]">{data.billing.creditBalance}</p>
				<p class="mt-1 text-sm text-[#6c665f]">sandbox credits</p>
			</div>
		</div>
	</section>

	<section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
		<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
			<div class="flex items-center gap-3">
				<CreditCard class="text-[#c47b43]" size={18} />
				<div>
					<p class="text-sm font-semibold text-[#1e1b18]">Credit packs</p>
					<p class="mt-1 text-xs text-[#7a756d]">The seeded packs already reflect live pricing helper math.</p>
				</div>
			</div>

			<div class="mt-5 grid gap-4 md:grid-cols-3">
				{#each data.billing.creditPacks as pack, index (pack.id)}
					<div class={`rounded-[1.7rem] border p-4 ${index === 1 ? 'border-[#c47b43]/30 bg-[#fff4ef] shadow-[0_26px_50px_-38px_rgba(196,123,67,0.45)]' : 'border-black/8 bg-[#fbf7ef]'}`}>
						<p class="text-sm font-semibold text-[#173323]">{pack.name}</p>
						<p class="mt-2 text-3xl tracking-[-0.05em] text-[#173323]">{pack.priceLabel}</p>
						<p class="mt-1 text-sm text-[#6c665f]">{pack.credits} credits</p>
						<p class="mt-4 text-sm leading-7 text-[#5f5952]">{pack.detail}</p>
						<div class="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#173323]">
							{pack.sandboxReady ? 'Mapped for Polar sandbox' : 'Awaiting Polar mapping'}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="grid gap-6">
			<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<CircleDollarSign class="text-[#c47b43]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1e1b18]">Cost model</p>
						<p class="mt-1 text-xs text-[#7a756d]">The same pricing helper now powers the live studio flow.</p>
					</div>
				</div>
				<div class="mt-5 grid gap-3">
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4 text-sm text-[#2d2a25]">
						<p class="font-semibold">Base yard analysis</p>
						<p class="mt-2 text-[#655f57]">{data.billing.pricing.analysisCredits} credits for the planning brief and yard interpretation.</p>
					</div>
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4 text-sm text-[#2d2a25]">
						<p class="font-semibold">Per concept image</p>
						<p class="mt-2 text-[#655f57]">{data.billing.pricing.conceptCredits} credits per concept image after the base analysis step.</p>
					</div>
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4 text-sm text-[#2d2a25]">
						<p class="font-semibold">Target margin</p>
						<p class="mt-2 text-[#655f57]">Pricing assumes a {data.billing.pricing.targetMarginPercent}% target margin and a {data.billing.pricing.creditValueCents}-cent credit value.</p>
					</div>
				</div>
			</div>

			<div class="rounded-[2rem] border border-black/6 bg-[#173323] p-5 text-white shadow-[0_34px_90px_-64px_rgba(23,51,35,0.65)] sm:p-6">
				<div class="flex items-center gap-3">
					<ShieldCheck class="text-[#f0c486]" size={18} />
					<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#f0c486]">Sandbox status</p>
				</div>
				<p class="mt-4 text-sm leading-7 text-white/78">Credit activity is now real inside the signed-in local workflow. The remaining billing work is wiring checkout, webhooks, and true purchase grants on top of the same pricing model.</p>
			</div>
		</div>
	</section>

	<section class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
		<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
			<div class="flex items-center gap-3">
				<History class="text-[#c47b43]" size={18} />
				<div>
					<p class="text-sm font-semibold text-[#1e1b18]">Ledger</p>
					<p class="mt-1 text-xs text-[#7a756d]">Each generation and demo top-up now shows up here.</p>
				</div>
			</div>

			<div class="mt-5 grid gap-3">
				{#each data.billing.ledger as entry (entry.id)}
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
						<div class="flex items-start justify-between gap-3">
							<div>
								<p class="font-semibold text-[#173323]">{entry.label}</p>
								<p class="mt-1 text-sm text-[#6d665e]">{entry.detail}</p>
								<p class="mt-1 text-xs text-[#7a756d]">{entry.dateLabel}</p>
							</div>
							<p class={`text-sm font-semibold ${entry.amountLabel.startsWith('+') ? 'text-[#20834d]' : 'text-[#173323]'}`}>{entry.amountLabel}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
			<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Billing follow-up</p>
			<h2 class="mt-2 text-3xl tracking-[-0.05em] text-[#173323]">Still left to wire</h2>
			<div class="mt-5 grid gap-3 text-sm leading-7 text-[#5f5952]">
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Connect the seeded pack ids to sandbox Polar products and expose checkout handoff routes.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Translate demo ledger logic into webhook-backed purchase and grant logic for signed-in users.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Swap guest-only sandbox credits for true account balances once Better Auth is fully wired.</div>
			</div>
		</div>
	</section>
</div>
