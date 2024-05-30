<script>
	import { getContext } from 'svelte'

	/*p24.description:
		The **Line** component creates a simple straight line from two points.
	*/

	const g = getContext('p45-grid')

	//p24.p.let.p: Alias for points.
	//p24.p.let.points: Start and end points separated by a comma.
	//p24.d.p.let.points: "B1,H7"
	export let p = 'B1,H7'
	export let points = p

	const xy = g.parseCSV(points)
</script>

<line {...$$restProps} x1={xy[0].x} y1={xy[0].y} x2={xy[1].x} y2={xy[1].y} />
