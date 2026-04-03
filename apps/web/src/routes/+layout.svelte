<script lang="ts">
import './layout.css'
import favicon from '$lib/assets/favicon.svg'
import { siteConfig } from '$lib/config/site'
import { ArrowUpRight, CircleUserRound, Sprout } from '@lucide/svelte'

const { children, data } = $props<{
	children: import('svelte').Snippet
	data: {
		session: {
			user: {
				id: string
				name: string
				email: string
				image: string | null
			}
		} | null
		auth: {
			enabledProviders: string[]
			emailPasswordEnabled: boolean
		}
	}
}>()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen overflow-hidden">
	<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,178,121,0.24),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(92,117,92,0.18),transparent_32%),linear-gradient(180deg,#fbf7ef_0%,#f3ecdf_100%)]"></div>
	<div class="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-8">
		<header class="sticky top-0 z-20 -mx-4 border-b border-black/6 bg-[rgba(251,247,239,0.8)] px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
			<div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
				<a class="flex min-w-0 items-center gap-3 text-[#173323]" href="/">
					<span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#173323] text-[#f8f0df] shadow-[0_18px_40px_-24px_rgba(23,51,35,0.8)]">
						<Sprout size={18} />
					</span>
					<span class="min-w-0">
						<span class="block font-display text-xl tracking-[-0.05em] text-[#173323]">{siteConfig.name}</span>
						<span class="hidden text-xs uppercase tracking-[0.24em] text-[#7e6d55] sm:block">{siteConfig.tagline}</span>
					</span>
				</a>

				<nav class="hidden items-center gap-5 text-sm font-medium text-[#3e4938] md:flex">
					<a class="transition hover:text-[#173323]" href="/studio">Studio</a>
					<a class="transition hover:text-[#173323]" href="/billing">Billing</a>
					<a class="transition hover:text-[#173323]" href="/account">Account</a>
					<a class="transition hover:text-[#173323]" href="/privacy">Privacy</a>
					<a class="transition hover:text-[#173323]" href="/docs">Roadmap</a>
				</nav>

				<div class="flex items-center gap-2">
					<a class="hidden items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-medium text-[#173323] shadow-[0_10px_30px_-22px_rgba(23,51,35,0.35)] sm:flex" href={data.session ? '/account' : '/sign-in'}>
						<CircleUserRound size={16} />
						{data.session ? data.session.user.name : 'Sign in'}
					</a>
					<a class="flex items-center gap-2 rounded-full bg-[#c47b43] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_36px_-22px_rgba(196,123,67,0.8)] transition hover:bg-[#b06d3b]" href="/studio">
						<span class="hidden sm:inline">{siteConfig.cta}</span>
						<span class="sm:hidden">Studio</span>
						<ArrowUpRight size={16} />
					</a>
				</div>
			</div>
		</header>

		{@render children()}
	</div>
</div>
