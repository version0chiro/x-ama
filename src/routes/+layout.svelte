<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	const menuSettings: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'top-end'
	};
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="uppercase text-sm sm:text-base md:text-lg lg:text-xl">X-AMA</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface hidden sm:hidden lg:flex"
					href="https://github.com/version0chiro/x-ama"
					target="_blank"
					rel="noreferrer"
				>
					Github
				</a>
				{#if !session}
					<div class="flex sm:hidden">
						<button class="btn btn-sm variant-filled-primary" use:popup={menuSettings}>Menu</button>
					</div>

					<div class="card p-4 shadow-xl" data-popup="popupFeatured">
						<div class="flex flex-col gap-2 w-full">
							<form method="post" action="/auth/login?/twitter">
								<button type="submit" class="btn btn-sm variant-filled-warning"
									>Sign In with Twitter</button
								>
							</form>
							<form method="post" action="/auth/login?/google">
								<button type="submit" class="btn btn-sm variant-filled-success"
									>Sign In with Google</button
								>
							</form>
						</div>
					</div>
				{/if}
				<div class="gap-4 hidden sm:flex lg:flex">
					{#if !session}
						<form method="post" action="/auth/login?/twitter">
							<button type="submit" class="btn btn-sm variant-filled-warning"
								>Sign In with Twitter</button
							>
						</form>
						<form method="post" action="/auth/login?/google">
							<button type="submit" class="btn btn-sm variant-filled-success"
								>Sign In with Google</button
							>
						</form>
					{/if}
				</div>
				{#if session}
					<p class="hidden md:block lg:block">
						Signed in as {session.user.user_metadata.user_name}
					</p>
					<p class="block md:hidden lg:hidden text-sm">{session.user.user_metadata.user_name}</p>
					<form method="post" action="/auth/logout">
						<button type="submit">Sign Out</button>
					</form>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
