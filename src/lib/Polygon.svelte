<script>
	import { getContext } from 'svelte'
	import { toSvgPoint } from './path'

	/*p24.description:
		The **Polygon** component creates a polygon from a set of points.
	*/

	const g = getContext('p45-grid')

	//p24.p.let.p: Alias for points.
	//p24.p.let.points: Comma separated list of nodes.
	//p24.d.p.let.points: "B1, H1, H7, B7"
	export let p = 'B1, H1, H7, B7'
	export let points = p

	const svgPoints = g //
		.parseCSV(points)
		.map(({ x, y }) => `${x},${y}`)
</script>

<polygon {...$$restProps} points={svgPoints} />
