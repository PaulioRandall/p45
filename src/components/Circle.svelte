<script>
	import { getContext } from 'svelte'
	import Grid from '../grid/Grid.js'
	import { Parse } from '../util/Parse.js'

	const grid = getContext('grid')

	const defaultO = grid.center
	const defaultR = 4

	export let ref = '<Unknown>'
	export let oPropRef = 'o'
	export let rPropRef = 'r'

	export let o = defaultO
	export let r = defaultR

	o = Parse.node(ref, oPropRef, o, defaultO, grid.boundsPx)
	r = Parse.number(ref, rPropRef, r, defaultR, { min: 1, max: 7 })
	r = Math.round(r * Grid.UNIT)
</script>

<circle
	{...$$restProps}
	vector-effect="non-scaling-stroke"
	cx={o.x}
	cy={o.y}
	{r} />
