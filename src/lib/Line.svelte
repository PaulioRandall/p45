<script>
	import { getContext } from 'svelte'

	const g = getContext('p45-grid')

	export let f = 'A0'
	export let from = f

	export let t = 'I8'
	export let to = t

	const fCoords = g.parse(from)
	const tCoords = g.parse(to)
</script>

<line
	{...$$restProps}
	x1={fCoords.x}
	y1={fCoords.y}
	x2={tCoords.x}
	y2={tCoords.y} />
