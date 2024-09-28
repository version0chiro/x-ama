<script lang="ts">
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="flex flex-col gap-4 w-full">
		<a href="/messages/unanswered">
			<div class="card p-4 lg:w-1/2">See your messages</div>
		</a>
		<div class="card p-4 lg:w-1/2 flex flex-col gap-4">
			Drop message for
			{#if form?.success}
				<div class="alert alert-success">
					{form.success}
				</div>
			{/if}
			<form class="flex flex-col gap-4" action="?/drop" method="POST">
				<input type="text" placeholder="Username" class="input" name="username" />
				<input type="text" placeholder="Message" class="input" name="message" />
				<button class="btn variant-filled">Submit</button>
			</form>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
