<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	let tabSet = 0;

	export let isAnswered: boolean;

	if (isAnswered) {
		tabSet = 1;
	} else {
		tabSet = 0;
	}
</script>

<div class="flex flex-col gap-4 items-stretch p-2 h-full w-full">
	<TabGroup>
		<Tab
			bind:group={tabSet}
			name="tab1"
			value={0}
			on:click={() => {
				tabSet = 0;
				goto("/messages/unanswered");
			}}
		>
			<span>Unanswered</span>
		</Tab>
		<Tab
			bind:group={tabSet}
			name="tab2"
			value={1}
			on:click={() => {
				tabSet = 1;
				goto("/messages/answered");
			}}
		>
			<span>Answered</span>
		</Tab>
		<!-- Tab Panels --->
	</TabGroup>
	<slot />
</div>
