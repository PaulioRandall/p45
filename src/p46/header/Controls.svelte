<script>
	import Button from './Button.svelte'

	export let pointsEnabled
	export let guidelinesEnabled
	export let targetEnabled
	export let axisEnabled

	const togglePoints = () => {
		pointsEnabled = !pointsEnabled
	}

	const toggleGuidelines = () => {
		guidelinesEnabled = !guidelinesEnabled
	}

	const toggleTarget = () => {
		targetEnabled = !targetEnabled
	}

	const toggleAxis = () => {
		axisEnabled = !axisEnabled
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

<Button on:click={togglePoints}>
	Points
	<input type="checkbox" bind:checked={pointsEnabled} />
</Button>

<Button on:click={toggleGuidelines}>
	Guidelines
	<input type="checkbox" bind:checked={guidelinesEnabled} />
</Button>

<Button on:click={toggleTarget}>
	Target
	<input type="checkbox" bind:checked={targetEnabled} />
</Button>

<Button on:click={toggleAxis}>
	Axis
	<input type="checkbox" bind:checked={axisEnabled} />
</Button>
