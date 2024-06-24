<script>
	import { getContext } from 'svelte'
	import RefGridButton from './RefGridButton.svelte'

	const selectedStore = getContext('p45-ref-grid-selected-store')

	let leftButton = false
	let rightButton = false

	const newTextCopier = (buttonName) => {
		return (event) => copyText(event, buttonName)
	}

	const copyText = (event, buttonName) => {
		navigator?.clipboard?.writeText(event.target.textContent)

		if (buttonName === 'left') {
			leftButton = true
			setTimeout(() => (leftButton = false), 2500)
		} else {
			rightButton = true
			setTimeout(() => (rightButton = false), 2500)
		}
	}
</script>

<div>
	<RefGridButton on:click={newTextCopier('left')}>
		{$selectedStore.node}
	</RefGridButton>
	{#if leftButton}
		Copied
	{/if}
</div>
<div>
	{#if rightButton}
		Copied
	{/if}
	<RefGridButton on:click={newTextCopier('right')}>
		{$selectedStore.x}:{$selectedStore.y}
	</RefGridButton>
</div>
