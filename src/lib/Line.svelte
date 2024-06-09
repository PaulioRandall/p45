<script>
	import { getContext } from 'svelte'

	/*@component
		The `<Line>` component creates a line from two or more points.
	*/

	const g = getContext('p45-grid')

	//@prop points
	// Comma separated list of points from first to last that represent a line.
	// @default "B1,H7"
	// @alias p
	export let p = 'B1,H7'
	export let points = p

	const path = g //
		.parseCSV(points)
		.map(g.nodeToSvgPoint)
		.join(' ')
</script>

<path {...$$restProps} d={path} />
