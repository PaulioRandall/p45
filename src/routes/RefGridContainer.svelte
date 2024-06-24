<script>
	import P45 from '$lib/P45'
	import RefGrid from '$lib/RefGrid.svelte'

	const p45 = new P45(24)
</script>

<RefGrid {p45} />
