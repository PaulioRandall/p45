<script>
	import { getContext } from 'svelte'

	/*@component
		The `<Shape>` component creates a shape from three or more points.
	*/

	const g = getContext('p45-grid')

	//@prop points
	// Comma separated list of points from first to last that represent a shape.
	// The shape will complete itself with a straight line.
	// @default "E1,H4,G7,E5,C7,B4"
	// @alias p
	export let p = 'E1,H4,G7,E5,C7,B4'
	export let points = p

	const path = g //
		.parseCSV(points)
		.map(g.nodeToSvgPoint)
		.join(' ')
</script>

<path {...$$restProps} d="{path} Z" />
