<script>
	import { fade } from 'svelte/transition'
	import RefGridButton from './RefGridButton.svelte'

	export let selected

	let leftButton = false
	let rightButton = false

	const newTextCopier = (buttonName) => {
		return (event) => copyText(event, buttonName)
	}

	const copyText = (event, buttonName) => {
		navigator?.clipboard?.writeText(event.target.textContent)

		if (buttonName === 'left') {
			leftButton = true
			setTimeout(() => (leftButton = false), 1500)
		} else {
			rightButton = true
			setTimeout(() => (rightButton = false), 1500)
		}
	}
</script>

{#if selected}
	<div class="p45-ref-grid-copy-button-container">
		<RefGridButton on:click={newTextCopier('left')}>
			{selected.node}
		</RefGridButton>
		{#if leftButton}
			<span transition:fade={{ duration: 1000 }}> Copied </span>
		{/if}
	</div>
	<div class="p45-ref-grid-copy-button-container">
		{#if rightButton}
			<span transition:fade={{ duration: 1000 }}> Copied </span>
		{/if}
		<RefGridButton on:click={newTextCopier('right')}>
			{selected.x}:{selected.y}
		</RefGridButton>
	</div>
{/if}

<style>
	.p45-ref-grid-copy-button-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
