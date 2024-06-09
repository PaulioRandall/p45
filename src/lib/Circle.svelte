<script>
	import { getContext } from 'svelte'

	/*@component
		The `<Circle>` component creates a circle from a center origin and radius.
	*/

	const g = getContext('p45-grid')

	//@prop origin
	// Circle center point.
	// @default "E4"
	// @alias o
	export let o = 'E4'
	export let origin = o

	//@prop radius
	// Circle radius.
	// @default 3
	// @alias r
	export let r = 3
	export let radius = r

	const cxy = g.parse(origin)
</script>

<circle {...$$restProps} cx={cxy.x} cy={cxy.y} r={radius} />
