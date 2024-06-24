<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a circle from a center origin and radius.
	*/

	const p45 = getContext('p45')

	//@prop origin
	// Circle center point.
	// @default P45.centerNode
	// @alias o
	export let o = p45.centerNode
	export let origin = o

	//@prop radius
	// Circle radius.
	// @default P45.center-1
	// @alias r
	export let r = p45.center - 1
	export let radius = r

	const cxy = p45.parseNode(origin)
</script>

<circle {...$$restProps} cx={cxy.x} cy={cxy.y} r={radius}>
	<!--@slot
		Animation and other inner elements.
	-->
	<slot />
</circle>
