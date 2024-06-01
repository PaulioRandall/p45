<script>
	import { getContext } from 'svelte'
	import { toSvgPoint } from './path'

	/*p24.description:
		The **Shape** component creates a shape from three or more points.
	*/

	const g = getContext('p45-grid')

	//p24.p.let.p: Alias for points.
	//p24.p.let.points:
	// Comma separated list of points from first to last that represent a shape.
	// The shape will complete itself with a straight line.
	//p24.d.p.let.points: "B1,H3,E7"
	export let p = 'E1,H4,G7,E5,C7,B4'
	export let points = p

	const path = g.parseCSV(points).map(toSvgPoint).join(' ')
</script>

<path {...$$restProps} d="{path} Z" />
