<svelte:head>
	<title>Landscape It Privacy and Trust</title>
</svelte:head>

<div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 py-6 sm:py-8">
	<section class="rounded-[2rem] border border-black/6 bg-white px-5 py-6 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:px-6 sm:py-7">
		<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6c49]">Trust and privacy</p>
		<h1 class="mt-2 text-4xl tracking-[-0.05em] text-[#173323]">Plain-language expectations for uploads, concepts, and billing.</h1>
		<p class="mt-3 max-w-3xl text-sm leading-7 text-[#625d55]">Landscape It is built for homeowners making planning decisions, not for stamped construction drawings or guaranteed planting success. This page keeps the current local behavior explicit while the full production systems are still being wired.</p>
	</section>

	<section class="grid gap-6 lg:grid-cols-2">
		<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
			<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6c49]">Uploads and storage</p>
			<div class="mt-4 grid gap-3 text-sm leading-7 text-[#5f5952]">
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Uploaded yard photos and generated concept files stay private to your local workspace and are served through the app instead of a public bucket URL.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Using <strong class="text-[#173323]">Delete workspace data</strong> removes the saved workspace record and the related uploaded and generated media for that workspace.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Signed-in accounts inherit the guest workspace from the same device so the first concept pass can happen before account creation.</div>
			</div>
		</div>

		<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
			<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6c49]">Concept realism</p>
			<div class="mt-4 grid gap-3 text-sm leading-7 text-[#5f5952]">
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Concepts are inspiration and planning support. They do not confirm grading, drainage, irrigation, code, structural feasibility, or exact plant suitability.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">The brief uses humble language on purpose because a single yard photo cannot tell the full story.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">If a project matters financially or structurally, verify it with local experts before buying materials or starting work.</div>
			</div>
		</div>
	</section>

	<section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
		<div class="rounded-[2rem] border border-black/6 bg-white p-5 shadow-[0_34px_90px_-64px_rgba(23,51,35,0.28)] sm:p-6">
			<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6c49]">Billing posture</p>
			<div class="mt-4 grid gap-3 text-sm leading-7 text-[#5f5952]">
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">The current app uses sandbox credits for local development. Before real checkout launches, the UI should always show the cost of a generation before submission.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Credit packs are planned as one-time purchases, not recurring subscriptions, unless a future PRD explicitly changes that direction.</div>
				<div class="rounded-[1.4rem] border border-black/8 bg-[#fbf7ef] p-4">Refund and billing support copy should stay plain-English and visible anywhere real money is involved.</div>
			</div>
		</div>

		<div class="rounded-[2rem] border border-black/6 bg-[#173323] p-5 text-white shadow-[0_34px_90px_-64px_rgba(23,51,35,0.65)] sm:p-6">
			<p class="text-sm font-semibold uppercase tracking-[0.24em] text-[#f0c486]">Current local state</p>
			<h2 class="mt-2 text-3xl tracking-[-0.05em]">What is live right now</h2>
			<div class="mt-5 grid gap-3 text-sm leading-7 text-white/80">
				<div class="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">Better Auth sign-in is live with email/password, with guest-to-account workspace migration on the same device.</div>
				<div class="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">Guest mode is limited to one complimentary concept pass before sign-in, matching the product direction in the PRDs.</div>
				<div class="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">Full checkout, webhooks, moderation flows, and hosted AI providers are still planned follow-up work.</div>
			</div>
		</div>
	</section>
</div>
