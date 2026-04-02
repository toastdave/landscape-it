<script lang="ts">
import { prdIndex } from '$lib/data/showcase'
</script>

<svelte:head>
	<title>Landscape It Roadmap</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-5xl flex-col gap-6 py-6 sm:py-8">
	<section class="rounded-[2rem] border border-black/6 bg-white px-6 py-7 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:px-8">
		<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">PRD roadmap</p>
		<h1 class="mt-3 text-4xl tracking-[-0.05em] text-[#173323]">Future product work now has a clear spec trail.</h1>
		<p class="mt-4 max-w-3xl text-sm leading-7 text-[#625d55]">The actual docs live in the repo under `docs/prds`. This page mirrors the plan so the scaffolded app already points toward the upcoming implementation phases.</p>
	</section>

	<section class="grid gap-4">
		{#each prdIndex as entry (entry.path)}
			<article class="rounded-[1.7rem] border border-black/6 bg-white/86 p-5 shadow-[0_28px_70px_-62px_rgba(23,51,35,0.24)]">
				<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6c49]">{entry.path}</p>
				<h2 class="mt-3 text-2xl tracking-[-0.04em] text-[#173323]">{entry.title}</h2>
				<p class="mt-3 text-sm leading-7 text-[#5f6056]">{entry.description}</p>
			</article>
		{/each}
	</section>
</div>
