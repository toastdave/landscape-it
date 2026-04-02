<script lang="ts">
import { CircleAlert, LockKeyhole, Sparkles } from '@lucide/svelte'

const { data } = $props<{
	data: {
		enabledProviders: string[]
	}
}>()
</script>

<svelte:head>
	<title>Landscape It Sign In</title>
</svelte:head>

<div class="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center py-10">
	<div class="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
		<section class="rounded-[2rem] border border-black/6 bg-white px-6 py-8 shadow-[0_30px_80px_-64px_rgba(23,51,35,0.35)] sm:px-8">
			<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Auth scaffold</p>
			<h1 class="mt-3 text-4xl tracking-[-0.05em] text-[#173323]">Guest-first is planned. Account conversion comes after the first taste of value.</h1>
			<p class="mt-4 max-w-2xl text-sm leading-7 text-[#625d55]">The repo is scaffolded for Better Auth, but the actual sign-in wiring is future work. The intended product behavior mirrors `tidy`: one complimentary consumer workflow first, then Google and Apple sign-in before saved history, checkout, and repeat generations.</p>

			<div class="mt-6 rounded-[1.5rem] border border-black/8 bg-[#fbf7ef] p-4 text-sm leading-7 text-[#5f5c54]">
				<p class="font-semibold text-[#173323]">Current provider status</p>
				<p class="mt-2">{data.enabledProviders.length > 0 ? `Configured providers: ${data.enabledProviders.join(', ')}` : 'No providers are wired yet in this scaffold.'}</p>
			</div>
		</section>

		<aside class="grid gap-6">
			<section class="rounded-[2rem] border border-black/6 bg-[#173323] p-5 text-white shadow-[0_30px_80px_-64px_rgba(23,51,35,0.65)] sm:p-6">
				<div class="inline-flex rounded-full bg-white/10 p-3 text-[#f0c486]">
					<Sparkles size={20} />
				</div>
				<h2 class="mt-4 text-2xl tracking-[-0.04em]">Planned flow</h2>
				<p class="mt-3 text-sm leading-7 text-white/75">Upload a yard, get one complimentary concept, then ask for sign-in only when the homeowner wants saved history, billing, or more generations.</p>
			</section>

			<section class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_30px_80px_-64px_rgba(23,51,35,0.35)] sm:p-6">
				<div class="inline-flex rounded-full bg-[#fff0eb] p-3 text-[#c47b43]">
					<LockKeyhole size={20} />
				</div>
				<h2 class="mt-4 text-2xl tracking-[-0.04em] text-[#173323]">Why wait on auth wiring?</h2>
				<p class="mt-3 text-sm leading-7 text-[#625d55]">For this scaffold, the priority is repo structure, PRDs, ports, database modeling, and the product shell. OAuth and session persistence can slot in without reshaping the app later.</p>
			</section>

			<section class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_30px_80px_-64px_rgba(23,51,35,0.35)] sm:p-6">
				<div class="inline-flex rounded-full bg-[#fff4ef] p-3 text-[#b85e2b]">
					<CircleAlert size={20} />
				</div>
				<h2 class="mt-4 text-2xl tracking-[-0.04em] text-[#173323]">Local note</h2>
				<p class="mt-3 text-sm leading-7 text-[#625d55]">Apple Sign In still needs the Tailscale HTTPS hostname once auth is wired, so the repo keeps the same local-tailnet pattern as sibling apps.</p>
			</section>
		</aside>
	</div>
</div>
