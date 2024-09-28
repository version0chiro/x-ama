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

<div class="flex flex-col gap-4 justify-center items-center p-2">
	{#each messages as message, index}
		<div class="flex flex-col card p-4 w-1/3 gap-2">
			{#if $expandedStates[index]}
				<p>{message.messages}</p>
				<button class="btn variant-filled w-1/2" on:click={() => toggleExpand(index)}>
					{$expandedStates[index] ? 'Show Less' : 'Expand More'}
				</button>
			{:else}
				<p>{message.messages.slice(0, 100)}...</p>
				<button class="btn variant-filled w-1/2" on:click={() => toggleExpand(index)}>
					{$expandedStates[index] ? 'Show Less' : 'Expand More'}
				</button>
			{/if}
			{#each message.Answers as answer}
				<p>{answer.answer}</p>
			{/each}
		</div>
	{/each}
</div>
