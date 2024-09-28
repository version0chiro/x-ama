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

<div class="flex flex-col gap-4 w-full lg:text-xl justify-center items-center p-2">
	{#each messages as message, index}
		<div class="flex flex-col card p-4 sm:w-full lg:w-1/3 md:w-1/3 gap-2 items-center">
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
			<form
				class="flex flex-col justify-center items-center gap-2"
				method="post"
				action="?/answer"
			>
				<input type="text" name="answer" />
				<input type="hidden" name="message_id" value={message.id} />
				<button type="submit" class="btn variant-filled w-1/2 rounded-full">Submit</button>
			</form>
		</div>
	{/each}
</div>

<style>
	.card {
		width: inherit;
	}
</style>
