<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a line from two or more points.
	*/

	const g = getContext('p45-grid')

	//@prop points
	// Comma separated list of points from first to last that represent a line.
	// @default Grid.nodeOf(1, 1) + "," + Grid.nodeOf(Grid.size-1, Grid.size-1)
	// @alias p
	export let p = g.nodeOf(1, 1) + ',' + g.nodeOf(g.size - 1, g.size - 1)
	export let points = p

	const path = g //
		.parseCSV(points)
		.map(g.nodeToSvgPoint)
		.join(' ')
</script>

<path {...$$restProps} d={path} />
