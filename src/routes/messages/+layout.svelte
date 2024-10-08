<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { redirect } from '@sveltejs/kit';

	export let data; // Add this line to receive the data from layout.server.ts

	let unAnsweredCount = data.unAnsweredCount;
	let answeredCount = data.answeredCount;

	let tabSet = 0;

	let isAnswered = data.isAnswered;

	if (isAnswered) {
		tabSet = 1;
	} else {
		tabSet = 0;
	}

	let page_no = data.page_no;

	let isLoading = false;

	$: {
		if ($navigating) {
			isLoading = true;
		} else {
			isLoading = false;
		}
	}
	let maxPage = isAnswered ? Math.ceil(answeredCount) : Math.ceil(unAnsweredCount);

	let paginationSetting: PaginationSettings = {
		amounts: [10],
		page: page_no - 1,
		limit: 10,
		size: maxPage
	};

	$: {
		if (isAnswered) {
			maxPage = Math.ceil(answeredCount);
			paginationSetting.size = maxPage;
		} else {
			maxPage = Math.ceil(unAnsweredCount);
			paginationSetting.size = maxPage;
		}
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
				if (!isAnswered) {
					goto(`/messages/unanswered/${page_no}`);
				} else {
					goto(`/messages/unanswered/1`);
				}
				isAnswered = !isAnswered;
				isLoading = true;
			}}
		>
			<span>Unanswered</span>
			<span class="badge badge-filled bg-red-500 text-white">{unAnsweredCount}</span>
		</Tab>
		<Tab
			bind:group={tabSet}
			name="tab2"
			value={1}
			on:click={() => {
				tabSet = 1;
				if (isAnswered) {
					goto(`/messages/answered/${page_no}`);
				} else {
					goto(`/messages/answered/1`);
				}
				isAnswered = !isAnswered;
				isLoading = true;
			}}
		>
			<span>Answered</span>
			<span class="badge badge-filled bg-green-500 text-white">{answeredCount}</span>
		</Tab>
		<!-- Tab Panels --->
	</TabGroup>

	<!-- Add Paginator here -->

	{#if isLoading}
		<div class="flex justify-center items-center">
			<div role="status">
				<svg
					aria-hidden="true"
					class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	{:else}
		<Paginator
			bind:settings={paginationSetting}
			showFirstLastButtons={true}
			showPreviousNextButtons={true}
			on:page={(e) => {
				const nextPage = e.detail + 1;
				goto(`/messages/${isAnswered ? 'answered' : 'unanswered'}/${nextPage}`);
				isLoading = true;
			}}
		/>
		<slot />
	{/if}
</div>
