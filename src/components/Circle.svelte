<script>
	import { getContext } from 'svelte'
	import P45Grid from '../grid/P45Grid.js'
	import P45Util from '../grid/P45Util.js'

	const grid = getContext('grid')

	export let o = grid.centerNode
	export let r = 4
	export let ref = '???'

	if (!grid.containsPx(o.x, o.y)) {
		throw new Error(
			`[${ref}:P45:Circle] Origin o out of bounds: x=${o.x}, y=${o.y}`
		)
	}

	r = P45Util.parseNumber(r)
	if (!P45Util.within(r, 1, 7)) {
		throw new Error(
			`[${ref}:P45:Circle] Radius modifier r out of bounds: 1 <= ${r} <= 7`
		)
	}

	const rPx = Math.round(r * P45Grid.UNIT)
</script>

<circle
	{...$$restProps}
	vector-effect="non-scaling-stroke"
	cx={o.x}
	cy={o.y}
	r={rPx} />
