<script>
	import { getContext } from 'svelte'
	import { toSvgPoint } from './path'

	/*p24.description:
		The **Line** component creates a line from two or more points.
	*/

	const g = getContext('p45-grid')

	//p24.p.let.p: Alias for points.
	//p24.p.let.points:
	// Comma separated list of points from first to last that represent a line.
	//p24.d.p.let.points: "B1,H7"
	export let p = 'B1,H7'
	export let points = p

	const path = g.parseCSV(points).map(toSvgPoint).join(' ')
</script>

<path {...$$restProps} d={path} />
