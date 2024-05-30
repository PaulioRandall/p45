<script>
	import { getContext } from 'svelte'

	const g = getContext('p45-grid')

	//p24.p.let.p: Alias for points.
	//p24.p.let.points: Comma separated list of nodes.
	//p24.d.p.let.points: "B1, H1, H7, B7"
	export let p = 'B1, H1, H7, B7'
	export let points = p

	const svgPoints = points //
		.split(',')
		.map((n) => n.trim())
		.map((n) => g.parse(n))
		.map(({ x, y }) => `${x},${y}`)
</script>

<polygon {...$$restProps} points={svgPoints} />
