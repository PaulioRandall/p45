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
	export let radius = grid.len / 2
	export let sides = 6
	export let ref = '???'

	sides = P45Util.parseNumber(sides)
	if (sides < 3) {
		console.warn(
			`[${ref}:P45:RegularPolygon] sides prop too small, want 3 <= ${sides} `
		)
	}

	radius = P45Util.parseNumber(radius)
	if (radius <= 0) {
		console.warn(
			`[${ref}:P45:RegularPolygon] radius prop too small, want 0 > ${sides} `
		)
	}

	const points = P45RegPoly.points(sides, radius, {
		origin: origin,
		rotate: 180,
	})
</script>

<Polygon {...$$restProps} {points} />
