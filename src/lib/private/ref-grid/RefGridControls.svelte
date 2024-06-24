<script>
	import { getContext } from 'svelte'
	import RefGridButton from './RefGridButton.svelte'

	const controlStore = getContext('p45-ref-grid-control-store')

	const togglePoints = () => {
		$controlStore.pointsEnabled = !$controlStore.pointsEnabled
	}

	const toggleGuidelines = () => {
		$controlStore.guidelinesEnabled = !$controlStore.guidelinesEnabled
	}

	const toggleAxis = () => {
		$controlStore.axisEnabled = !$controlStore.axisEnabled
	}

	const copyText = (event) => {
		navigator?.clipboard?.writeText(event.target.textContent)

		const copiedElemId = event.target.dataset.copiedElementId
		if (!copiedElemId) {
			return
		}

		const elem = document.getElementById(copiedElemId)
		if (elem) {
			elem.style.visibility = 'visible'
			setTimeout(() => (elem.style.visibility = 'hidden'), 2500)
		}
	}
</script>

<RefGridButton on:click={togglePoints}>
	Points
	<input type="checkbox" bind:checked={$controlStore.pointsEnabled} />
</RefGridButton>

<RefGridButton on:click={toggleGuidelines}>
	Guidelines
	<input type="checkbox" bind:checked={$controlStore.guidelinesEnabled} />
</RefGridButton>

<RefGridButton on:click={toggleAxis}>
	Axis
	<input type="checkbox" bind:checked={$controlStore.axisEnabled} />
</RefGridButton>
