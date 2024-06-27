<button class="p46-button" on:click {...$$restProps}>
	<slot />
</button>

<style>
	.p46-button {
		min-width: 5rem;
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
		border-radius: 0.4rem;
		cursor: pointer;
		flex-grow: 1;
	}
</style>
