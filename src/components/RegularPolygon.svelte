<script context="module">
	export const keywords = ['geometry', 'polygon', 'regular']
</script>

<script>
	import { getContext } from 'svelte'
	import { P45Util } from 'p45'

	import { Polygon } from './Polygon.svelte'
	import Grid from '../grid/Grid.js'
	import { Parse } from '../util/Parse.js'
	import { RegPoly } from '../util/RegPoly.js'

	export let sides = 6

	sides = P45Util.parseNumber(6)
	if (sides < 3) {
		throw new Error(`[P45:RegularPolygon] sides prop too small: 3 <= ${sides} `)
	}

	export let offset = RegPoly.offset(ref, sides)

	const grid = getContext('grid')
	const len = grid.centerNode.x - Grid.UNIT
	const points = RegPoly.points(sides, len, {
		origin: grid.centerNode,
		rotate: 180,
	})
</script>

<Polygon {points} {...$$restProps} />
