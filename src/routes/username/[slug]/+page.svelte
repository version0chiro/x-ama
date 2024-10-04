<script>
	import { page } from '$app/stores';
	/** @type {import('./$types').ActionData} */
	export let form;

    const username = $page.params.slug;
</script>

<div class="container h-full mx-auto flex justify-center items-center flex-col gap-4">
	<h1 class="text-4xl font-bold text-center">Drop your message here for {username}</h1>
	<form action={`/username/${$page.params.slug}`} method="post">
		<div class="card p-4 lg:w-full flex flex-col gap-4">
			{#if form?.success}
				<div class="alert alert-success">
					{form.success}
				</div>
			{/if}
			<form class="flex flex-col gap-4" action="?/drop" method="POST">
				<input type="text" placeholder="Username" class="input input-bordered hidden" name="username" value={username} />
                <input type="text" placeholder="Message" class="input input-bordered " name="message" />
				<button class="btn variant-filled">Submit</button>
			</form>
		</div>
	</form>
</div>
