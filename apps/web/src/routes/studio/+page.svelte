<script lang="ts">
import { ArrowUpRight, ImagePlus, Leaf, SunMedium, Trees, Wallet } from '@lucide/svelte'

const { data } = $props<{
	data: {
		studio: typeof import('$lib/data/showcase').studioSnapshot
	}
}>()
</script>

<svelte:head>
	<title>Landscape It Studio</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-7xl flex-col gap-6 py-6 sm:py-8">
	<section class="rounded-[2rem] border border-black/6 bg-white px-5 py-6 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:px-6 sm:py-7">
		<div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
			<div>
				<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Studio scaffold</p>
				<h1 class="mt-2 text-4xl tracking-[-0.05em] text-[#173323]">Self-serve homeowner workflow comes first.</h1>
				<p class="mt-3 max-w-3xl text-sm leading-7 text-[#5e6056]">This page is intentionally scaffolded, not fully interactive yet. It shows the shape of the consumer studio: one project, one yard brief, concept imagery, and practical recommendations in a single view.</p>
			</div>
			<div class="rounded-[1.6rem] border border-black/8 bg-[#fbf7ef] px-5 py-5 text-center">
				<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6c49]">Viewer</p>
				<p class="mt-3 text-3xl tracking-[-0.05em] text-[#173323]">{data.studio.viewer.kind}</p>
				<p class="mt-1 text-sm text-[#6c665d]">{data.studio.viewer.creditBalance} complimentary run remaining</p>
			</div>
		</div>
	</section>

	<section class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
		<div class="grid gap-6">
			<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<Trees class="text-[#55725b]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1f3323]">Current project</p>
						<p class="mt-1 text-xs text-[#79715f]">One yard problem area at a time keeps the workflow approachable.</p>
					</div>
				</div>
				<div class="mt-5 grid gap-3">
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
						<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Project</p>
						<p class="mt-2 text-lg font-semibold text-[#173323]">{data.studio.project.title}</p>
						<p class="mt-1 text-sm text-[#5d5d56]">{data.studio.project.type}</p>
					</div>
					<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4 text-sm leading-7 text-[#565950]">{data.studio.project.objective}</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
							<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Budget</p>
							<p class="mt-2 text-sm font-medium text-[#173323]">{data.studio.project.budget}</p>
						</div>
						<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
							<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Maintenance</p>
							<p class="mt-2 text-sm font-medium text-[#173323]">{data.studio.project.maintenance}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="rounded-[2rem] border border-black/6 bg-[#173323] p-5 text-white shadow-[0_34px_90px_-64px_rgba(23,51,35,0.7)] sm:p-6">
				<div class="flex items-center gap-3">
					<SunMedium class="text-[#f0c486]" size={18} />
					<div>
						<p class="text-sm font-semibold">Yard brief</p>
						<p class="mt-1 text-xs text-white/65">Analysis-first guidance should anchor the generated imagery.</p>
					</div>
				</div>
				<div class="mt-5 space-y-4 text-sm leading-7 text-white/80">
					<div>
						<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c486]">Sunlight read</p>
						<p class="mt-2">{data.studio.brief.sunlight}</p>
					</div>
					<div>
						<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c486]">Style direction</p>
						<p class="mt-2">{data.studio.brief.style}</p>
					</div>
					<div>
						<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c486]">Phased plan</p>
						<div class="mt-3 grid gap-3">
							{#each data.studio.brief.phases as phase (phase)}
								<div class="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3">{phase}</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="grid gap-6">
			<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<ImagePlus class="text-[#c47b43]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1f3323]">Concept imagery</p>
						<p class="mt-1 text-xs text-[#79715f]">Future work: generation, comparison, favorite states, and regenerations.</p>
					</div>
				</div>
				<div class="mt-5 grid gap-4 md:grid-cols-2">
					<div class="overflow-hidden rounded-[1.6rem] border border-black/8 bg-[#f8f2e8]">
						<div class="h-56 bg-linear-to-br from-[#ebd0a9] via-[#aeb98b] to-[#4b654d]"></div>
						<div class="p-4">
							<p class="text-sm font-semibold text-[#173323]">Concept A</p>
							<p class="mt-2 text-sm leading-7 text-[#5b5f54]">More layered planting, stronger path emphasis, and a softer lawn footprint.</p>
						</div>
					</div>
					<div class="overflow-hidden rounded-[1.6rem] border border-black/8 bg-[#f8f2e8]">
						<div class="h-56 bg-linear-to-br from-[#dfc09a] via-[#9fb27d] to-[#30473b]"></div>
						<div class="p-4">
							<p class="text-sm font-semibold text-[#173323]">Concept B</p>
							<p class="mt-2 text-sm leading-7 text-[#5b5f54]">More structured borders, fewer plant types, and a cleaner contemporary arrival sequence.</p>
						</div>
					</div>
				</div>
			</div>

			<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<Leaf class="text-[#55725b]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1f3323]">Recommended moves</p>
						<p class="mt-1 text-xs text-[#79715f]">Plant, hardscape, and lighting suggestions should feel specific enough to act on.</p>
					</div>
				</div>
				<div class="mt-5 grid gap-3">
					{#each data.studio.recommendations as item (item)}
						<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4 text-sm leading-7 text-[#5b5d54]">{item}</div>
					{/each}
				</div>
				<div class="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
					<a class="inline-flex items-center gap-2 text-[#c47b43]" href="/billing"><Wallet size={15} /> See credit model</a>
					<a class="inline-flex items-center gap-2 text-[#173323]" href="/docs">Open roadmap <ArrowUpRight size={15} /></a>
				</div>
			</div>
		</div>
	</section>
</div>
