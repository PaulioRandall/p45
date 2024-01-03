<script>
	import { getContext } from 'svelte'
	import P45Grid from '../grid/P45Grid.js'
	import P45Util from '../grid/P45Util.js'

	const grid = getContext('grid')

	export let origin = grid.centerNode
	export let radius = 4
	export let ref = '???'

	if (!grid.containsPx(origin.x, origin.y)) {
		throw new Error(
			`[${ref}:P45:Circle] Origin origin out of bounds: x=${origin.x}, y=${origin.y}`
		)
	}

	radius = P45Util.parseNumber(radius)
	if (!P45Util.within(radius, 0.01, 7)) {
		throw new Error(
			`[${ref}:P45:Circle] Radius modifier radius out of bounds: 0.01 <= ${radius} <= 7`
		)
	}

	const rPx = radius * P45Grid.UNIT
</script>

<circle
	vector-effect="non-scaling-stroke"
	{...$$restProps}
	cx={origin.x}
	cy={origin.y}
	r={rPx} />
