<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a polygon from a set of points.
	*/

	const g = getContext('p45-grid')

	//@prop points
	// Comma separated list of nodes.
	// @default "B1, H1, H7, B7"
	// @alias p
	export let p = 'B1, H1, H7, B7'
	export let points = p

	const svgPoints = g //
		.parseCSV(points)
		.map(({ x, y }) => `${x},${y}`)
</script>

<polygon {...$$restProps} points={svgPoints} />
