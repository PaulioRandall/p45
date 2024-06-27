<script>
	import { fade } from 'svelte/transition'
	import Button from './Button.svelte'

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
	<div class="p46-copy-button-container">
		<Button on:click={newTextCopier('left')}>
			{selected.node}
		</Button>
		{#if leftButton}
			<span transition:fade={{ duration: 1000 }}> Copied </span>
		{/if}
	</div>
	<div class="p46-copy-button-container">
		{#if rightButton}
			<span transition:fade={{ duration: 1000 }}> Copied </span>
		{/if}
		<Button on:click={newTextCopier('right')}>
			{selected.x}:{selected.y}
		</Button>
	</div>
{/if}

<style>
	.p46-copy-button-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
