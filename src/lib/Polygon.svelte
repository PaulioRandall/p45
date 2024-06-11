<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a polygon from a set of points.
	*/

	const g = getContext('p45-grid')

	//@prop points
	// Comma separated list of nodes.
	// @default [
	// 	Grid.nodeOf(1, 1),
	//  Grid.nodeOf(Grid.size-1, 1),
	// 	Grid.nodeOf(Grid.size-1, Grid.size-1),
	// 	Grid.nodeOf(1, Grid.size-1),
	// ].join(',')
	// @alias p
	export let p = [
		g.nodeOf(1, 1),
		g.nodeOf(g.size - 1, 1),
		g.nodeOf(g.size - 1, g.size - 1),
		g.nodeOf(1, g.size - 1),
	].join(',')
	export let points = p

	const svgPoints = g //
		.parseCSV(points)
		.map(({ x, y }) => `${x},${y}`)
</script>

<polygon {...$$restProps} points={svgPoints} />
