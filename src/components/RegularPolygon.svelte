<script context="module">
	export const keywords = ['geometry', 'polygon', 'regular']
</script>

<script>
	import { getContext } from 'svelte'
	import P45Grid from '../grid/P45Grid.js'
	import P45Util from '../grid/P45Util.js'

	import { Polygon } from './Polygon.svelte'
	import { RegPoly } from '../util/RegPoly.js'

	export let sides = 6
	export let ref = '???'

	sides = P45Util.parseNumber(6)
	if (sides < 3) {
		throw new Error(
			`[${ref}:P45:RegularPolygon] sides prop too small: 3 <= ${sides} `
		)
	}

	export let offset = RegPoly.offset(ref, sides)

	const grid = getContext('grid')
	const len = grid.centerNode.x - P45Grid.UNIT
	const points = RegPoly.points(sides, len, {
		origin: grid.centerNode,
		rotate: 180,
	})
</script>

<Polygon {points} {...$$restProps} />
