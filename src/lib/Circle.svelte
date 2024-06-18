<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a circle from a center origin and radius.
	*/

	const g = getContext('p45-grid')

	//@prop origin
	// Circle center point.
	// @default Grid.centerNode
	// @alias o
	export let o = g.centerNode
	export let origin = o

	//@prop radius
	// Circle radius.
	// @default Grid.center-1
	// @alias r
	export let r = g.center - 1
	export let radius = r

	const cxy = g.parseNode(origin)
</script>

<circle {...$$restProps} cx={cxy.x} cy={cxy.y} r={radius} />
