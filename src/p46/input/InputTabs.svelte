<script>
	import TabLabels from './TabLabels.svelte'
	import Textarea from './Textarea.svelte'

	export let shapes = {}
	let selectedId = ''

	const newShape = (data = 'move to A0\n') => {
		const id = crypto.randomUUID().slice(24)
		shapes[id] = data
		selectedId = id
	}

	const delShape = () => {
		if (Object.keys(shapes).length > 1) {
			delete shapes[selectedId]
			shapes = shapes

			const ids = Object.keys(shapes)
			selectedId = ids[ids.length - 1]
		}
	}

	newShape(
		[
			'move to U2',
			'quad curve to M22 with slope V16',
			'quad curve to E2 with slope D16',
			'quad curve to U2 with slope M8',
			'close',
		].join('\n')
	)
</script>

<div class="p46-input-tabs">
	<TabLabels
		ids={Object.keys(shapes)}
		bind:selected={selectedId}
		{newShape}
		{delShape} />
	<div class="p46-input-tab-content">
		<Textarea bind:value={shapes[selectedId]} />
	</div>
</div>

<style>
	.p46-input-tabs {
	}

	.p46-input-tab-content {
	}
</style>
