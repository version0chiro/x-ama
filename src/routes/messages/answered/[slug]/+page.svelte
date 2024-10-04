<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;
	const messages = data.data;

	// Add this line to import the necessary Svelte store
	import { writable } from 'svelte/store';

	// Create a store to keep track of expanded states
	const expandedStates = writable(messages.map(() => false));

	// Function to toggle expanded state for a specific message
	function toggleExpand(index: number) {
		expandedStates.update((states) => {
			states[index] = !states[index];
			return states;
		});
	}
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-2">
	{#each messages as message, index}
		<div class="card p-4 flex flex-col gap-2">
			<div class="flex-grow">
				{#if $expandedStates[index]}
					<p>{message.messages}</p>
				{:else}
					<p>{message.messages.slice(0, 100)}...</p>
				{/if}
			</div>
			<button class="btn btn-sm variant-filled self-start" on:click={() => toggleExpand(index)}>
				{$expandedStates[index] ? 'Show Less' : 'Expand More'}
			</button>
			{#each message.Answers as answer}
				<p class="mt-2">{answer.answer}</p>
			{/each}
		</div>
	{/each}
</div>


<style>
	.card {
		width: inherit;
	}
</style>