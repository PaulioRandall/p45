<script>
	import { getContext } from 'svelte'
	import RegularPolygon from './private/RegularPolygon.js'

	/*@component
		Creates a regular polygon from an origin center point, number of edges,
		and radius to a vertex.
	*/

	//@prop p45
	// P45 instance to use as grid and context.
	// @default getContext('p45')
	export let p45 = getContext('p45')

	//@prop origin
	// Origin to use for transforms.
	// @default P45.centerNode
	export let origin = p45.centerNode

	//@prop sides
	// Number of sides.
	// @default 6
	export let sides = 6

	//@prop radius
	// Circle radius.
	// @default P45.center - 1
	export let radius = p45.center - 1

	//@prop rotate
	// Amount to rotate counter clockwise in degrees, may be negative.
	// @default 0
	export let rotate = 0

	const rp = new RegularPolygon(p45)

	const points = rp.generatePath(origin, sides, radius, rotate)
</script>

<polygon {...$$restProps} {points}>
	<!--@slot
		Any elements allowable within an SVG `<polygon>`.
	-->
	<slot />
</polygon>
