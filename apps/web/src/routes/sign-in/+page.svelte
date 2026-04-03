<script lang="ts">
import { ArrowRight, CircleAlert, LockKeyhole, Sparkles } from '@lucide/svelte'

type SessionUser = {
	user: {
		id: string
		name: string
		email: string
		image: string | null
	}
} | null

const { data, form } = $props<{
	data: {
		enabledProviders: string[]
		emailPasswordEnabled: boolean
		session: SessionUser
		reason: string | null
		next: string
	}
	form?: {
		error?: string
		mode?: 'create-account' | 'sign-in'
	}
}>()

const mode = $state<'create-account' | 'sign-in'>(form?.mode ?? 'create-account')

const reasonCopy = $derived.by(() => {
	switch (data.reason) {
		case 'continue':
			return 'Your first guest concept is ready. Sign in to keep generating, buy credits later, and carry this yard into your account.'
		case 'save':
			return 'Sign in to save concepts and recommendations to your account.'
		case 'history':
			return 'Sign in to reopen saved projects, saved concepts, and account activity.'
		case 'billing':
			return 'Sign in to review your balance, credit packs, and billing history.'
		default:
			return 'Keep going from guest mode into a real account. Your local guest workspace moves with you after sign-in.'
	}
})
</script>

<svelte:head>
	<title>Landscape It Sign In</title>
</svelte:head>

<div class="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center py-10">
	<div class="grid w-full gap-6 lg:grid-cols-[1.08fr_0.92fr]">
		<section class="rounded-[2rem] border border-black/6 bg-white px-6 py-8 shadow-[0_30px_80px_-64px_rgba(23,51,35,0.35)] sm:px-8">
			<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Account access</p>
			<h1 class="mt-3 text-4xl tracking-[-0.05em] text-[#173323]">
				{data.session ? 'You are already signed in.' : 'Keep your yard ideas, saves, and future billing in one place.'}
			</h1>
			<p class="mt-4 max-w-2xl text-sm leading-7 text-[#625d55]">{reasonCopy}</p>

			<div class="mt-6 rounded-[1.5rem] border border-black/8 bg-[#fbf7ef] p-4 text-sm leading-7 text-[#5f5c54]">
				<p class="font-semibold text-[#173323]">What carries over</p>
				<p class="mt-2">Your current guest workspace, generated concepts, and saved project context move into your account after sign-in on this device.</p>
			</div>

			{#if form?.error}
				<div class="mt-5 rounded-[1.4rem] border border-[#c47b43]/25 bg-[#fff4ef] px-4 py-3 text-sm text-[#9e4f22]">
					{form.error}
				</div>
			{/if}

			{#if data.session}
				<div class="mt-6 rounded-[1.6rem] border border-black/8 bg-[#fbf7ef] p-5">
					<p class="text-sm font-semibold text-[#173323]">Signed in as</p>
					<p class="mt-2 text-2xl tracking-[-0.05em] text-[#173323]">{data.session.user.name}</p>
					<p class="mt-1 text-sm text-[#6b655d]">{data.session.user.email}</p>
					<div class="mt-5 flex flex-wrap gap-3">
						<a class="inline-flex items-center gap-2 rounded-full bg-[#173323] px-4 py-2 text-sm font-semibold text-white" href={data.next}>
							Continue
							<ArrowRight size={15} />
						</a>
						<form method="POST" action="?/signOut">
							<button class="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#173323]" type="submit">
								Sign out
							</button>
						</form>
					</div>
				</div>
			{:else}
				<div class="mt-6 flex flex-wrap gap-3">
					<button class={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'create-account' ? 'bg-[#173323] text-white' : 'border border-black/10 bg-white text-[#173323]'}`} type="button" onclick={() => (mode = 'create-account')}>
						Create account
					</button>
					<button class={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'sign-in' ? 'bg-[#173323] text-white' : 'border border-black/10 bg-white text-[#173323]'}`} type="button" onclick={() => (mode = 'sign-in')}>
						Sign in
					</button>
				</div>

				{#if data.emailPasswordEnabled}
					<form class="mt-5 grid gap-4" method="POST" action={mode === 'create-account' ? '?/signUp' : '?/signIn'}>
						<input name="next" type="hidden" value={data.next} />
						{#if mode === 'create-account'}
							<label class="grid gap-2 text-sm font-medium text-[#173323]">
								<span>Name</span>
								<input class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="name" placeholder="Avery Homeowner" required />
							</label>
						{/if}

						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Email</span>
							<input class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="email" type="email" placeholder="you@example.com" required />
						</label>

						<label class="grid gap-2 text-sm font-medium text-[#173323]">
							<span>Password</span>
							<input class="rounded-[1rem] border border-black/10 bg-[#fbf7ef] px-4 py-3" name="password" type="password" minlength="8" placeholder="At least 8 characters" required />
						</label>

						<button class="inline-flex items-center justify-center gap-2 rounded-full bg-[#c47b43] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_-24px_rgba(196,123,67,0.8)] transition hover:bg-[#b06d3b]" type="submit">
							{mode === 'create-account' ? 'Create account and continue' : 'Sign in and continue'}
						</button>
					</form>
				{/if}
			{/if}
		</section>

		<aside class="grid gap-6">
			<section class="rounded-[2rem] border border-black/6 bg-[#173323] p-5 text-white shadow-[0_30px_80px_-64px_rgba(23,51,35,0.65)] sm:p-6">
				<div class="inline-flex rounded-full bg-white/10 p-3 text-[#f0c486]">
					<Sparkles size={20} />
				</div>
				<h2 class="mt-4 text-2xl tracking-[-0.04em]">Guest-first, then account-backed</h2>
				<p class="mt-3 text-sm leading-7 text-white/75">The product still leads with value first. Authentication shows up once the homeowner wants more generations, saves, billing, or longer-lived history.</p>
			</section>

			<section class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_30px_80px_-64px_rgba(23,51,35,0.35)] sm:p-6">
				<div class="inline-flex rounded-full bg-[#fff0eb] p-3 text-[#c47b43]">
					<LockKeyhole size={20} />
				</div>
				<h2 class="mt-4 text-2xl tracking-[-0.04em] text-[#173323]">Auth now live locally</h2>
				<p class="mt-3 text-sm leading-7 text-[#625d55]">Email and password works out of the box for local development, and social providers can be enabled with env credentials later without reshaping the product flow.</p>
			</section>

			<section class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_30px_80px_-64px_rgba(23,51,35,0.35)] sm:p-6">
				<div class="inline-flex rounded-full bg-[#fff4ef] p-3 text-[#b85e2b]">
					<CircleAlert size={20} />
				</div>
				<h2 class="mt-4 text-2xl tracking-[-0.04em] text-[#173323]">Provider status</h2>
				<p class="mt-3 text-sm leading-7 text-[#625d55]">
					{data.enabledProviders.length > 0
						? `Configured providers: ${data.enabledProviders.join(', ')}.`
						: 'Email/password is available now. Google can be enabled with env keys, and Apple stays planned for the HTTPS Tailscale setup.'}
				</p>
			</section>
		</aside>
	</div>
</div>
