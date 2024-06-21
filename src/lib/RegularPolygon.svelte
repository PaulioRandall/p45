<script>
	import { getContext } from 'svelte'
	import RegularPolygon from './private/RegularPolygon.js'

	/*@component
		Creates a regular polygon from an origin center point, number of edges,
		and radius to a vertex.
	*/

	const p45 = getContext('p45')

	//p24.p.let.o: Alias for start.
	//p24.p.let.origin: Origin node representing the center of the polygon.
	//p24.d.p.let.origin: P45.centerNode
	export let o = p45.centerNode
	export let origin = o

	//p24.p.let.s: Alias for side.
	//p24.p.let.sides: Number of sides.
	//p24.d.p.let.sides: 6
	export let s = 6
	export let sides = s

	//p24.p.let.r: Alias for radius.
	//p24.p.let.radius: Radius to a vertex.
	//p24.d.p.let.radius: P45.center - 1
	export let r = p45.center - 1
	export let radius = r

	//p24.p.let.ro: Alias for rotate.
	//p24.p.let.rotate:
	// Amount to rotate counter clockwise in degrees, may be negative.
	//p24.d.p.let.rotate: 0
	export let ro = 0
	export let rotate = ro

	const rp = new RegularPolygon(p45)

	const points = rp.generatePath(origin, sides, radius, rotate)
</script>

<polygon {...$$restProps} {points} />
