<script context="module">
	export const keywords = ['geometry', 'polygon', 'regular']
</script>

<script>
	import { getContext } from 'svelte'
	import { Polygon } from './Polygon.svelte'
	import Grid from '../grid/Grid.js'
	import { Parse } from '../util/Parse.js'
	import { RegPoly } from '../util/RegPoly.js'

	const defaultSides = 6

	export let ref = '<Unknown>'
	export let sides = defaultSides
	sides = Parse.number(ref, 'sides', sides, defaultSides, { min: 3 })
	export let offset = RegPoly.offset(ref, sides)

	const grid = getContext('grid')
	const len = grid.center.x - Grid.UNIT
	const points = RegPoly.points(sides, len, {
		origin: grid.center,
		rotate: 180,
	})
</script>

<Polygon {points} {...$$restProps} />
