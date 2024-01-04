<script context="module">
	export const keywords = ['geometry', 'polygon', 'regular']
</script>

<script>
	import { getContext } from 'svelte'
	import P45Grid from '../grid/P45Grid.js'
	import P45Util from '../grid/P45Util.js'
	import P45RegPoly from '../grid/P45RegPoly.js'
	import Polygon from './Polygon.svelte'

	const grid = getContext('grid')

	export let origin = grid.centerNode
	export let sides = 6
	export let ref = '???'

	sides = P45Util.parseNumber(sides)
	if (sides < 3) {
		throw new Error(
			`[${ref}:P45:RegularPolygon] sides prop too small: 3 <= ${sides} `
		)
	}

	const len = grid.centerNode.x - P45Grid.UNIT
	const points = P45RegPoly.points(sides, len, {
		origin: origin,
		rotate: 180,
	})
</script>

<Polygon {points} {...$$restProps} />
