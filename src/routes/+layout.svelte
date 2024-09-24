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
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">X-AMA</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/version0chiro/x-ama"
					target="_blank"
					rel="noreferrer"
				>
					Github
				</a>
				{#if !session}
					<form method="post" action="/auth/login">
						<button type="submit">Sign In</button>
					</form>
				{/if}
				{#if session}
					<p>Signed in as {session.user.user_metadata.user_name}</p>
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
