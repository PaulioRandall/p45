<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a circle from a center origin and radius.
	*/

	//@prop p45
	// P45 instance to use as grid and context.
	// @default getContext('p45')
	export let p45 = getContext('p45')

	//@prop origin
	// Circle center point.
	// @default P45.centerNode
	export let origin = p45.centerNode

	//@prop radius
	// Circle radius.
	// @default P45.center - 1
	export let radius = p45.center - 1

	const cxy = p45.parseNode(origin)
</script>

<circle {...$$restProps} cx={cxy.x} cy={cxy.y} r={radius}>
	<!--@slot
		Any elements allowable within an SVG `<circle>`.
	-->
	<slot />
</circle>
