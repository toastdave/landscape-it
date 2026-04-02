<script lang="ts">
import type {
	LandscapeGeneration,
	LandscapeProject,
	LandscapeWorkspaceResponse,
} from '$lib/types/landscape'
import {
	ArrowRight,
	CreditCard,
	ImagePlus,
	Leaf,
	RefreshCcw,
	SunMedium,
	Trees,
	Upload,
	Wallet,
} from '@lucide/svelte'

const { data, form } = $props<{
	data: {
		workspace: LandscapeWorkspaceResponse
		selectedProjectId: string | null
		selectedGenerationId: string | null
	}
	form?: {
		action?: string
		error?: string
	}
}>()

const selectedProject = $derived.by<LandscapeProject | null>(() => {
	return (
		data.workspace.projects.find(
			(project: LandscapeProject) => project.id === data.selectedProjectId
		) ??
		data.workspace.projects[0] ??
		null
	)
})

const selectedGeneration = $derived.by<LandscapeGeneration | null>(() => {
	if (!selectedProject) {
		return null
	}

	return (
		selectedProject.generations.find(
			(generation: LandscapeGeneration) => generation.id === data.selectedGenerationId
		) ??
		selectedProject.generations.find(
			(generation: LandscapeGeneration) => generation.id === selectedProject.activeGenerationId
		) ??
		selectedProject.generations[0] ??
		null
	)
})
</script>

<svelte:head>
	<title>Landscape It Studio</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-7xl flex-col gap-6 py-6 sm:py-8">
	<section class="rounded-[2rem] border border-black/6 bg-white px-5 py-6 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:px-6 sm:py-7">
		<div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
			<div>
				<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Working studio flow</p>
				<h1 class="mt-2 text-4xl tracking-[-0.05em] text-[#173323]">Upload a yard photo, generate concepts, and keep iterating in one place.</h1>
				<p class="mt-3 max-w-3xl text-sm leading-7 text-[#5e6056]">This local flow is intentionally deterministic and file-backed so it stays dependable during development. The future AI providers can replace the generation internals without changing the product structure.</p>
			</div>
			<div class="grid gap-3 sm:min-w-72">
				<div class="rounded-[1.6rem] border border-black/8 bg-[#fbf7ef] px-5 py-4 text-center">
					<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6c49]">Viewer</p>
					<p class="mt-2 text-2xl tracking-[-0.05em] text-[#173323]">{data.workspace.viewer.label}</p>
					<p class="mt-1 text-sm text-[#6c665d]">{data.workspace.viewer.kind} workspace</p>
				</div>
				<div class="rounded-[1.6rem] border border-black/8 bg-[#fbf7ef] px-5 py-4 text-center">
					<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6c49]">Credits</p>
					<p class="mt-2 text-3xl tracking-[-0.05em] text-[#173323]">{data.workspace.viewer.creditBalance}</p>
					<p class="mt-1 text-sm text-[#6c665d]">sandbox credits left</p>
				</div>
				<div class="flex flex-wrap gap-3">
					<form method="POST" action="?/addDemoCredits">
						<button class="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-[#173323]" type="submit">
							<Wallet size={15} /> Add demo credits
						</button>
					</form>
					<form method="POST" action="?/resetWorkspace">
						<button class="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-[#173323]" type="submit">
							<RefreshCcw size={15} /> Reset workspace
						</button>
					</form>
				</div>
			</div>
		</div>

		<div class="mt-6 grid gap-3 md:grid-cols-3">
			<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
				<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Complimentary guest run</p>
				<p class="mt-2 text-sm leading-7 text-[#5d5d56]">{data.workspace.viewer.trial.usedGenerations} used / {data.workspace.viewer.trial.includedGenerations} included.</p>
			</div>
			<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
				<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Current pricing</p>
				<p class="mt-2 text-sm leading-7 text-[#5d5d56]">{data.workspace.pricing.analysisCredits} base + {data.workspace.pricing.conceptCredits} per concept image.</p>
			</div>
			<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
				<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Projects created</p>
				<p class="mt-2 text-sm leading-7 text-[#5d5d56]">{data.workspace.projects.length} saved in this local workspace.</p>
			</div>
		</div>

		{#if form?.error}
			<div class="mt-5 rounded-[1.4rem] border border-[#c47b43]/25 bg-[#fff4ef] px-4 py-3 text-sm text-[#9e4f22]">
				{form.error}
			</div>
		{/if}
	</section>

	<section class="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
		<div class="grid gap-6">
			<section class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<Upload class="text-[#c47b43]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1f3323]">Create a yard project</p>
						<p class="mt-1 text-xs text-[#79715f]">The first generation happens immediately after upload so the value is visible fast.</p>
					</div>
				</div>

				<form class="mt-5 grid gap-4" method="POST" action="?/createProject" enctype="multipart/form-data">
					<div class="grid gap-4 sm:grid-cols-2">
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Project title</span>
							<input class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="title" placeholder="Maple front yard" required />
						</label>
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Project type</span>
							<select class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="projectType">
								<option value="curb_appeal">Curb appeal</option>
								<option value="front_yard_refresh">Front yard refresh</option>
								<option value="backyard_makeover">Backyard makeover</option>
								<option value="patio_upgrade">Patio upgrade</option>
								<option value="garden_bed_redesign">Garden bed redesign</option>
								<option value="outdoor_living">Outdoor living</option>
							</select>
						</label>
					</div>

					<label class="grid gap-2 text-sm font-medium text-[#173323]">
						<span>What do you want to change?</span>
						<textarea class="min-h-28 rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="objective" placeholder="Make the entry feel warmer, reduce lawn fuss, and add a cleaner planting rhythm." required></textarea>
					</label>

					<div class="grid gap-4 sm:grid-cols-2">
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Budget</span>
							<input class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="budgetLabel" placeholder="$4k-$8k" required />
						</label>
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Budget mode</span>
							<select class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="budgetMode">
								<option value="shopping">Shopping-ready</option>
								<option value="planning_only">Planning only</option>
							</select>
						</label>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Maintenance</span>
							<select class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="maintenanceLevel">
								<option value="low">Low</option>
								<option value="medium" selected>Medium</option>
								<option value="high">High</option>
							</select>
						</label>
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Sun exposure</span>
							<select class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="sunExposure">
								<option value="mixed" selected>Mixed</option>
								<option value="full_sun">Mostly full sun</option>
								<option value="part_shade">Part shade</option>
								<option value="full_shade">Mostly shade</option>
							</select>
						</label>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Style direction</span>
							<input class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="styleDirection" placeholder="Warm modern cottage" required />
						</label>
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Climate or region</span>
							<input class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="climateZone" placeholder="Zone 9 or Southern California" />
						</label>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Concept count</span>
							<select class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="imageCount">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3" selected>3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</label>
						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Source photo</span>
							<input class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3 file:mr-3 file:rounded-full file:border-0 file:bg-[#173323] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" name="photo" type="file" accept="image/*" required />
						</label>
					</div>

					<div class="flex flex-wrap gap-4 text-sm text-[#5c6056]">
						<label class="inline-flex items-center gap-2"><input name="kidFriendly" type="checkbox" /> Kid friendly</label>
						<label class="inline-flex items-center gap-2"><input name="petFriendly" type="checkbox" /> Pet friendly</label>
					</div>

					<button class="inline-flex items-center justify-center gap-2 rounded-full bg-[#c47b43] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_-24px_rgba(196,123,67,0.8)] transition hover:bg-[#b06d3b]" type="submit">
						Generate first concepts
						<ArrowRight size={16} />
					</button>
				</form>
			</section>

			<section class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
				<div class="flex items-center gap-3">
					<Trees class="text-[#55725b]" size={18} />
					<div>
						<p class="text-sm font-semibold text-[#1f3323]">Projects in this workspace</p>
						<p class="mt-1 text-xs text-[#79715f]">Pick any prior yard to revisit its brief and concept passes.</p>
					</div>
				</div>

				{#if data.workspace.projects.length > 0}
					<div class="mt-5 grid gap-3">
						{#each data.workspace.projects as project (project.id)}
							<a class={`rounded-[1.4rem] border p-4 transition ${selectedProject?.id === project.id ? 'border-[#c47b43]/30 bg-[#fff4ef] shadow-[0_20px_40px_-32px_rgba(196,123,67,0.5)]' : 'border-black/8 bg-[#fbf7ef] hover:bg-white'}`} href={`/studio?project=${project.id}&generation=${project.activeGenerationId}`}>
								<div class="flex items-start justify-between gap-3">
									<div>
										<p class="font-semibold text-[#173323]">{project.title}</p>
										<p class="mt-1 text-xs uppercase tracking-[0.18em] text-[#8b6c49]">{project.projectTypeLabel}</p>
									</div>
									<span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#173323]">{project.generations.length} pass{project.generations.length === 1 ? '' : 'es'}</span>
								</div>
								<p class="mt-3 text-sm leading-7 text-[#5c6056]">{project.objective}</p>
							</a>
						{/each}
					</div>
				{:else}
					<div class="mt-5 rounded-[1.4rem] border border-dashed border-black/10 bg-[#fbf7ef] p-4 text-sm leading-7 text-[#5f5952]">Your first uploaded yard will appear here once you generate concepts.</div>
				{/if}
			</section>
		</div>

		<div class="grid gap-6">
			{#if selectedProject && selectedGeneration}
				<section class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
					<div class="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
						<div class="grid gap-5">
							<div>
								<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Selected project</p>
								<h2 class="mt-2 text-3xl tracking-[-0.05em] text-[#173323]">{selectedProject.title}</h2>
								<p class="mt-2 text-sm leading-7 text-[#5f6056]">{selectedProject.objective}</p>
							</div>

							<img class="h-72 w-full rounded-[1.6rem] border border-black/8 object-cover" src={selectedProject.sourcePhoto.url} alt={selectedProject.sourcePhoto.alt} />

							<div class="grid gap-3 sm:grid-cols-2">
								<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
									<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Budget</p>
									<p class="mt-2 text-sm font-medium text-[#173323]">{selectedProject.budgetLabel}</p>
								</div>
								<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
									<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Maintenance</p>
									<p class="mt-2 text-sm font-medium text-[#173323]">{selectedProject.maintenanceLabel}</p>
								</div>
								<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
									<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Exposure</p>
									<p class="mt-2 text-sm font-medium text-[#173323]">{selectedProject.sunExposureLabel}</p>
								</div>
								<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
									<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">Use case</p>
									<p class="mt-2 text-sm font-medium text-[#173323]">{selectedProject.kidPetLabel}</p>
								</div>
							</div>
						</div>

						<div class="grid gap-5">
							<div class="rounded-[1.6rem] border border-black/8 bg-[#173323] p-5 text-white shadow-[0_28px_70px_-56px_rgba(23,51,35,0.7)]">
								<div class="flex items-center gap-3">
									<SunMedium class="text-[#f0c486]" size={18} />
									<div>
										<p class="text-sm font-semibold">Yard brief</p>
										<p class="mt-1 text-xs text-white/65">{selectedGeneration.costLabel}</p>
									</div>
								</div>
								<p class="mt-4 text-sm leading-7 text-white/80">{selectedGeneration.brief.summary}</p>
								<div class="mt-4 grid gap-3 text-sm leading-7 text-white/80">
									<div>
										<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c486]">Sunlight read</p>
										<p class="mt-2">{selectedGeneration.brief.sunlight}</p>
									</div>
									<div>
										<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c486]">Style direction</p>
										<p class="mt-2">{selectedGeneration.brief.styleDirection}</p>
									</div>
								</div>
							</div>

							<div class="rounded-[1.6rem] border border-black/8 bg-[#fbf7ef] p-5">
								<div class="flex items-center gap-3">
									<CreditCard class="text-[#c47b43]" size={18} />
									<div>
										<p class="text-sm font-semibold text-[#173323]">Generate another pass</p>
										<p class="mt-1 text-xs text-[#6c665f]">Use the same yard with a tighter direction or new concept count.</p>
									</div>
								</div>

								<form class="mt-4 grid gap-3" method="POST" action="?/regenerate">
									<input name="projectId" type="hidden" value={selectedProject.id} />
									<label class="grid gap-2 text-sm font-medium text-[#173323]">
										<span>Prompt</span>
										<textarea class="min-h-24 rounded-[1rem] border border-black/10 bg-white px-4 py-3" name="prompt" required>{selectedGeneration.prompt}</textarea>
									</label>
									<div class="grid gap-3 sm:grid-cols-2">
										<label class="grid gap-2 text-sm font-medium text-[#173323]">
											<span>Budget</span>
											<input class="rounded-[1rem] border border-black/10 bg-white px-4 py-3" name="budgetLabel" value={selectedGeneration.budgetLabel} required />
										</label>
										<label class="grid gap-2 text-sm font-medium text-[#173323]">
											<span>Budget mode</span>
											<select class="rounded-[1rem] border border-black/10 bg-white px-4 py-3" name="budgetMode">
												<option value="shopping" selected={selectedGeneration.budgetMode === 'shopping'}>Shopping-ready</option>
												<option value="planning_only" selected={selectedGeneration.budgetMode === 'planning_only'}>Planning only</option>
											</select>
										</label>
									</div>
									<div class="grid gap-3 sm:grid-cols-3">
										<label class="grid gap-2 text-sm font-medium text-[#173323] sm:col-span-2">
											<span>Style direction</span>
											<input class="rounded-[1rem] border border-black/10 bg-white px-4 py-3" name="styleDirection" value={selectedProject.styleDirection} required />
										</label>
										<label class="grid gap-2 text-sm font-medium text-[#173323]">
											<span>Maintenance</span>
											<select class="rounded-[1rem] border border-black/10 bg-white px-4 py-3" name="maintenanceLevel">
												<option value="low" selected={selectedProject.maintenanceLabel === 'Low maintenance'}>Low</option>
												<option value="medium" selected={selectedProject.maintenanceLabel === 'Medium maintenance'}>Medium</option>
												<option value="high" selected={selectedProject.maintenanceLabel === 'High maintenance'}>High</option>
											</select>
										</label>
									</div>
									<label class="grid gap-2 text-sm font-medium text-[#173323]">
										<span>Concept count</span>
										<select class="rounded-[1rem] border border-black/10 bg-white px-4 py-3" name="imageCount">
											<option value="1" selected={selectedGeneration.imageCount === 1}>1</option>
											<option value="2" selected={selectedGeneration.imageCount === 2}>2</option>
											<option value="3" selected={selectedGeneration.imageCount === 3}>3</option>
											<option value="4" selected={selectedGeneration.imageCount === 4}>4</option>
											<option value="5" selected={selectedGeneration.imageCount === 5}>5</option>
										</select>
									</label>
									<button class="inline-flex items-center justify-center gap-2 rounded-full bg-[#173323] px-5 py-3 text-sm font-semibold text-white" type="submit">
										<ImagePlus size={16} /> Generate new pass
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>

				<section class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
					<div class="flex flex-wrap items-center justify-between gap-3">
						<div>
							<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Concept history</p>
							<h2 class="mt-2 text-3xl tracking-[-0.05em] text-[#173323]">Choose a pass to compare directions</h2>
						</div>
						<a class="text-sm font-semibold text-[#c47b43]" href="/billing">Review credit model</a>
					</div>

					<div class="mt-5 flex flex-wrap gap-3">
						{#each selectedProject.generations as generation (generation.id)}
							<a class={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedGeneration.id === generation.id ? 'border-[#c47b43]/30 bg-[#fff4ef] text-[#9e4f22]' : 'border-black/8 bg-[#fbf7ef] text-[#173323] hover:bg-white'}`} href={`/studio?project=${selectedProject.id}&generation=${generation.id}`}>
								{generation.label} - {generation.createdAtLabel}
							</a>
						{/each}
					</div>

					<div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{#each selectedGeneration.concepts as concept (concept.id)}
							<article class="overflow-hidden rounded-[1.7rem] border border-black/8 bg-[#f8f2e8] shadow-[0_22px_50px_-40px_rgba(23,51,35,0.3)]">
								<div class="relative">
									<img class="h-72 w-full object-cover" src={concept.assetUrl} alt={`${selectedProject.title} ${concept.label}`} />
									<div class="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">{concept.label}</div>
								</div>
								<div class="p-4">
									<p class="text-sm leading-7 text-[#5f5952]">{concept.caption}</p>
									<form class="mt-4" method="POST" action="?/toggleSaveConcept">
										<input name="projectId" type="hidden" value={selectedProject.id} />
										<input name="generationId" type="hidden" value={selectedGeneration.id} />
										<input name="conceptId" type="hidden" value={concept.id} />
										<button class={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${concept.isSaved ? 'border-[#c47b43]/30 bg-[#fff4ef] text-[#9e4f22]' : 'border-black/8 bg-white text-[#173323]'}`} type="submit">
											<Leaf size={15} /> {concept.isSaved ? 'Saved to account' : 'Save concept'}
										</button>
									</form>
								</div>
							</article>
						{/each}
					</div>
				</section>

				<section class="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
					<div class="rounded-[2rem] border border-black/6 bg-[#173323] p-5 text-white shadow-[0_34px_90px_-64px_rgba(23,51,35,0.65)] sm:p-6">
						<div class="flex items-center gap-3">
							<SunMedium class="text-[#f0c486]" size={18} />
							<div>
								<p class="text-sm font-semibold">Quick wins and bigger moves</p>
								<p class="mt-1 text-xs text-white/65">Keep the practical brief near the visuals.</p>
							</div>
						</div>
						<div class="mt-5 grid gap-4 text-sm leading-7 text-white/80">
							<div>
								<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c486]">Quick wins</p>
								<div class="mt-3 grid gap-3">
									{#each selectedGeneration.brief.quickWins as item (item)}
										<div class="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3">{item}</div>
									{/each}
								</div>
							</div>
							<div>
								<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c486]">Bigger moves</p>
								<div class="mt-3 grid gap-3">
									{#each selectedGeneration.brief.biggerMoves as item (item)}
										<div class="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3">{item}</div>
									{/each}
								</div>
							</div>
							<div>
								<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c486]">Phased plan</p>
								<div class="mt-3 grid gap-3">
									{#each selectedGeneration.brief.phases as item (item)}
										<div class="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3">{item}</div>
									{/each}
								</div>
							</div>
						</div>
					</div>

					<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
						<div class="flex items-center gap-3">
							<Leaf class="text-[#55725b]" size={18} />
							<div>
								<p class="text-sm font-semibold text-[#1f3323]">Recommended moves</p>
								<p class="mt-1 text-xs text-[#79715f]">Save the items worth revisiting later from the account page.</p>
							</div>
						</div>
						<div class="mt-5 grid gap-3">
							{#each selectedGeneration.recommendations as recommendation (recommendation.id)}
								<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">
									<div class="flex items-start justify-between gap-3">
										<div>
											<p class="font-semibold text-[#173323]">{recommendation.title}</p>
											<p class="mt-1 text-xs uppercase tracking-[0.18em] text-[#8b6c49]">{recommendation.category} - {recommendation.merchant}</p>
										</div>
										<span class="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#173323]">{recommendation.priceLabel}</span>
									</div>
									<p class="mt-3 text-sm leading-7 text-[#5f5952]">{recommendation.reason}</p>
									<form class="mt-4" method="POST" action="?/toggleSaveRecommendation">
										<input name="projectId" type="hidden" value={selectedProject.id} />
										<input name="generationId" type="hidden" value={selectedGeneration.id} />
										<input name="recommendationId" type="hidden" value={recommendation.id} />
										<button class={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${recommendation.isSaved ? 'border-[#c47b43]/30 bg-[#fff4ef] text-[#9e4f22]' : 'border-black/8 bg-white text-[#173323]'}`} type="submit">
											<Wallet size={15} /> {recommendation.isSaved ? 'Saved to account' : 'Save recommendation'}
										</button>
									</form>
								</div>
							{/each}
						</div>
					</div>
				</section>
			{:else}
				<section class="rounded-[2rem] border border-dashed border-black/10 bg-white/80 p-8 text-center shadow-[0_30px_80px_-64px_rgba(23,51,35,0.22)]">
					<div class="mx-auto flex max-w-xl flex-col items-center gap-4">
						<div class="rounded-full bg-[#fff4ef] p-4 text-[#c47b43]">
							<ImagePlus size={24} />
						</div>
						<h2 class="text-3xl tracking-[-0.05em] text-[#173323]">No projects yet</h2>
						<p class="text-sm leading-7 text-[#5f6056]">Create your first yard project from the form on the left. Once you upload a photo, the app will generate a brief, concept images, and recommendations automatically.</p>
					</div>
				</section>
			{/if}
		</div>
	</section>
</div>
