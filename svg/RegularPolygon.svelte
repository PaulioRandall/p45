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

	export let origin = grid.center
	export let radius = grid.center.x - grid.UNIT
	export let sides = 6
	export let ref = '???'

	const s = P45Util.parseNumber(sides)
	if (s < 3) {
		console.warn(`[${ref}:P45:RegularPolygon] Needs 3 or more sides`)
	}

	const r = P45Util.parseNumber(radius)
	if (isNaN(r)) {
		console.warn(
			`[${ref}:P45:RegularPolygon] Your radius is not a parsable number`
		)
	}

	const points = P45RegPoly.points(
		Math.round(s), //
		r, //
		{
			//
			origin: origin, //
			rotate: 180, //
		} //
	)
</script>

<Polygon {...$$restProps} {points} />
