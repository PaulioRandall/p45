<script>
	import P45 from '$lib/P45'
	import ReferenceGrid from '$lib/ReferenceGrid.svelte'

	const p45 = new P45(24)
</script>

<ReferenceGrid {p45} />
