<script>
	import { getContext } from 'svelte'

	/*p24.description:
		The **Line** component creates a line from two or more points. Each line
		section will be straight.
	*/

	const g = getContext('p45-grid')

	//p24.p.let.p: Alias for points.
	//p24.p.let.points: Points from line start to end, each separated by a comma.
	//p24.d.p.let.points: "B1,H7"
	export let p = 'B1,H7'
	export let points = p

	//p24.p.let.usepath:
	// True to force use of the SVG path element even when an SVG line element
	// would do.
	//p24.d.p.let.usepath: false
	export let usepath = false

	const coords = g.parseCSV(points)
	const toPath = () =>
		coords
			.map(({ x, y }, i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`))
			.join(' ')
</script>

{#if usepath || coords.length > 2}
	<path {...$$restProps} d={toPath()} />
{:else if coords.length === 2}
	<line
		{...$$restProps}
		x1={coords[0].x}
		y1={coords[0].y}
		x2={coords[1].x}
		y2={coords[1].y} />
{/if}
