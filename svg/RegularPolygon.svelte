<script>
	import { getContext } from 'svelte'
	import P45Util from '../grid/P45Util.js'
	import P45RegPoly from '../grid/P45RegPoly.js'
	import Polygon from './Polygon.svelte'

	const grid = getContext('grid')
	const parseInt = (n) => {
		const i = P45Util.parseNumber(n)
		return Math.round(i)
	}

	export let origin = grid.center
	export let radius = grid.center.x - grid.UNIT
	export let sides = 6

	$: points = P45RegPoly.points(
		parseInt, //
		P45Util.parseNumber(radius), //
		{
			origin: origin, //
			rotate: 180, //
		}
	)
</script>

<Polygon {...$$restProps} {points} />
