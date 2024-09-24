<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	const messages = data.data;

	console.log(messages);
</script>

<div class="flex flex-col gap-4 justify-center items-center p-2">
	{#each messages as message}
		<div class="flex flex-col card p-4 w-1/3">
			<p>{message.messages}</p>
		</div>
	{/each}
</div>
