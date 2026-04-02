<script lang="ts">
import { siteConfig } from '$lib/config/site'
import { futurePillars, sampleConcepts, workflowSteps } from '$lib/data/showcase'
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Upload } from '@lucide/svelte'
</script>

<svelte:head>
	<title>{siteConfig.name}</title>
	<meta name="description" content={siteConfig.description} />
</svelte:head>

<div class="mx-auto flex w-full max-w-7xl flex-col gap-8 py-8 sm:gap-10 sm:py-10">
	<section class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
		<div class="rounded-[2rem] border border-black/6 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(246,239,226,0.92))] px-6 py-7 shadow-[0_36px_90px_-68px_rgba(23,51,35,0.45)] sm:px-8 sm:py-9">
			<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#9c6a39]">Consumer landscaping studio</p>
			<h1 class="mt-4 max-w-3xl text-5xl leading-none tracking-[-0.06em] text-[#173323] sm:text-6xl">Imagine a better yard before you spend a weekend or a dollar.</h1>
			<p class="mt-5 max-w-2xl text-base leading-8 text-[#5a604f] sm:text-lg">Landscape It is being scaffolded as a self-serve product for homeowners who want clearer outdoor direction fast: upload a photo, set a goal, and get AI-generated landscaping concepts plus a practical brief.</p>

			<div class="mt-7 flex flex-col gap-3 sm:flex-row">
				<a class="inline-flex items-center justify-center gap-2 rounded-full bg-[#c47b43] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_-24px_rgba(196,123,67,0.8)] transition hover:bg-[#b06d3b]" href="/studio">
					{siteConfig.cta}
					<ArrowRight size={16} />
				</a>
				<a class="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[#233827] transition hover:bg-[#faf6ef]" href="/docs">
					Read the roadmap
				</a>
			</div>

			<div class="mt-8 grid gap-3 sm:grid-cols-3">
				<div class="rounded-[1.5rem] border border-black/8 bg-white/80 p-4">
					<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6c45]">Audience</p>
					<p class="mt-2 text-sm font-medium text-[#1f3323]">Homeowners, not pros</p>
				</div>
				<div class="rounded-[1.5rem] border border-black/8 bg-white/80 p-4">
					<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6c45]">Monetization</p>
					<p class="mt-2 text-sm font-medium text-[#1f3323]">Credit packs after the first free run</p>
				</div>
				<div class="rounded-[1.5rem] border border-black/8 bg-white/80 p-4">
					<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6c45]">Local ports</p>
					<p class="mt-2 text-sm font-medium text-[#1f3323]">1401-1407 with no sibling collision</p>
				</div>
			</div>
		</div>

		<div class="grid gap-4">
			<div class="rounded-[2rem] border border-black/6 bg-[#173323] p-6 text-white shadow-[0_36px_90px_-64px_rgba(23,51,35,0.72)]">
				<div class="inline-flex rounded-full bg-white/10 p-3 text-[#f0c486]">
					<Leaf size={20} />
				</div>
				<h2 class="mt-4 text-3xl tracking-[-0.05em]">Design intent</h2>
				<p class="mt-3 text-sm leading-7 text-white/78">This scaffold leans into warm, grounded outdoor tones instead of generic SaaS chrome so the future product already feels connected to home landscaping decisions.</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				<div class="rounded-[1.8rem] border border-black/6 bg-white p-5 shadow-[0_28px_70px_-62px_rgba(23,51,35,0.34)]">
					<Upload class="text-[#c47b43]" size={18} />
					<p class="mt-4 text-lg font-semibold tracking-[-0.03em] text-[#173323]">Photo first</p>
					<p class="mt-2 text-sm leading-7 text-[#5c5d54]">The app should feel natural on a phone in the driveway or backyard.</p>
				</div>
				<div class="rounded-[1.8rem] border border-black/6 bg-white p-5 shadow-[0_28px_70px_-62px_rgba(23,51,35,0.34)]">
					<ShieldCheck class="text-[#55725b]" size={18} />
					<p class="mt-4 text-lg font-semibold tracking-[-0.03em] text-[#173323]">Trust first</p>
					<p class="mt-2 text-sm leading-7 text-[#5c5d54]">Billing, privacy, and expectation-setting should remain plain-English everywhere.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="grid gap-4 md:grid-cols-3">
		{#each workflowSteps as step (step.title)}
			<article class="rounded-[1.8rem] border border-black/6 bg-white/86 p-5 shadow-[0_28px_70px_-62px_rgba(23,51,35,0.32)] sm:p-6">
				<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b6c49]">{step.eyebrow}</p>
				<h2 class="mt-3 text-2xl leading-tight tracking-[-0.04em] text-[#173323]">{step.title}</h2>
				<p class="mt-3 text-sm leading-7 text-[#5f6056]">{step.body}</p>
			</article>
		{/each}
	</section>

	<section class="rounded-[2rem] border border-black/6 bg-white/86 p-6 shadow-[0_30px_80px_-64px_rgba(23,51,35,0.28)] sm:p-8">
		<div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Concept directions</p>
				<h2 class="mt-2 text-3xl tracking-[-0.05em] text-[#173323]">The future studio should make outdoor possibilities easy to compare.</h2>
			</div>
			<a class="text-sm font-semibold text-[#c47b43]" href="/studio">See the scaffolded studio</a>
		</div>

		<div class="mt-6 grid gap-4 lg:grid-cols-3">
			{#each sampleConcepts as concept (concept.title)}
				<article class="overflow-hidden rounded-[1.8rem] border border-black/8 bg-[#faf5ec]">
					<div class={`h-52 bg-linear-to-br ${concept.gradient}`}></div>
					<div class="p-5">
						<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6c45]">{concept.meta}</p>
						<h3 class="mt-3 text-2xl tracking-[-0.04em] text-[#173323]">{concept.title}</h3>
						<p class="mt-3 text-sm leading-7 text-[#5a6050]">{concept.caption}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
		<div class="rounded-[2rem] border border-black/6 bg-[#173323] p-6 text-white shadow-[0_36px_90px_-64px_rgba(23,51,35,0.72)] sm:p-8">
			<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#f0c486]">Future pillars</p>
			<h2 class="mt-2 text-3xl tracking-[-0.05em]">What this scaffold is setting up next</h2>
			<div class="mt-5 grid gap-3 text-sm leading-7 text-white/80">
				{#each futurePillars as pillar (pillar)}
					<div class="flex gap-3 rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
						<CheckCircle2 class="mt-1 shrink-0 text-[#f0c486]" size={16} />
						<p>{pillar}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="rounded-[2rem] border border-black/6 bg-white/86 p-6 shadow-[0_30px_80px_-64px_rgba(23,51,35,0.28)] sm:p-8">
			<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Repo structure</p>
			<h2 class="mt-2 text-3xl tracking-[-0.05em] text-[#173323]">The repository already follows the sibling app pattern.</h2>
			<div class="mt-5 grid gap-3 text-sm leading-7 text-[#5b5c53]">
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4"><strong class="text-[#173323]">apps/web</strong> holds the SvelteKit shell, landing page, studio scaffold, account, billing, and roadmap surfaces.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4"><strong class="text-[#173323]">packages/db</strong> owns Drizzle schema, credit pricing helpers, and seeding for future implementation.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4"><strong class="text-[#173323]">docs/prds</strong> now contains the forward-looking product spec set for the landscaping workflow.</div>
			</div>
		</div>
	</section>
</div>
