<script>
	import P45 from '$lib/P45'
	import GridCanvas from '$lib/GridCanvas.svelte'

	const p45 = new P45(24)
</script>

<GridCanvas {p45} />
