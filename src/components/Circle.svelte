<script>
	import { getContext } from 'svelte'
	import { P45Util } from 'p45'

	import Grid from '../grid/Grid.js'
	import { Parse } from '../util/Parse.js'

	const grid = getContext('grid')

	export let o = grid.centerNode
	export let r = 4

	o = P45Util.parseXY(o)
	if (!grid.contains(o.x, o.y)) {
		throw new Error(`[P45:Circle] Origin o out of bounds: ${JSON.stringify(o)}`)
	}

	r = P45Util.parseNumber(r)
	if (!P45Util.within(r, 1, 7)) {
		throw new Error(
			`[P45:Circle] Radius modifier r out of bounds: 1 <= ${r} <= 7`
		)
	}

	r = Math.round(r * Grid.UNIT)
</script>

<circle
	{...$$restProps}
	vector-effect="non-scaling-stroke"
	cx={o.x}
	cy={o.y}
	{r} />
