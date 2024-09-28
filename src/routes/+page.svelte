<div class="container h-full mx-auto flex justify-center items-center">
	<div class="flex flex-col gap-4 w-full">
		<a href="/messages/unanswered">
			<div class="card p-4 lg:w-1/2">See your messages</div>
		</a>
		<div class="card p-4 lg:w-1/2 flex flex-col gap-4">
			Drop message for
			<form class="flex flex-col gap-4">
				<input type="text" placeholder="Username" class="input" />
				<input type="text" placeholder="Message" class="input" />
				<button class="btn variant-filled">Submit</button>
			</form>
		</div>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
