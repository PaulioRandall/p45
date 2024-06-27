<script>
	export let ids = []
	export let selected
	export let newShape
	export let delShape

	const newSelector = (id) => {
		return () => (selected = id)
	}
</script>

<div class="p46-input-tab-labels">
	<button
		class="p46-input-tab-label p46-input-tab-label-control"
		on:click={() => newShape()}>
		+
	</button>
	<button
		class="p46-input-tab-label p46-input-tab-label-control"
		on:click={() => delShape()}>
		-
	</button>
	{#each ids as id (id)}
		<button
			class="p46-input-tab-label"
			class:p46-input-tab-label-selected={selected === id}
			on:click={newSelector(id)}>
			{id}
		</button>
	{/each}
</div>

<style>
	.p46-input-tab-labels {
		display: flex;
		gap: 0.2rem;
		z-index: 1;
	}

	.p46-input-tab-label {
		padding: 0.5rem 1rem;
		border-radius: 0.4rem 0.4rem 0 0;
		border: 1px solid MediumSlateBlue;
		border-bottom: 1px solid dimgrey;

		min-width: 2rem;
		cursor: pointer;
	}

	.p46-input-tab-label-control {
		padding: 0 0.5rem;
		font-size: 2rem;
		width: 3rem;
	}

	.p46-input-tab-label-selected {
		padding: 0.5rem 1rem;
		border-radius: 0.4rem 0.4rem 0 0;
		box-shadow: inset 0 0 5px 2px crimson;
		border: 1px solid crimson;
		border-bottom: 1px solid dimgrey;

		min-width: 2rem;
		cursor: pointer;
	}
</style>
