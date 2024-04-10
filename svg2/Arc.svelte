<script>
	import { getContext } from 'svelte'

	import Path from './Path.svelte'
	import { M, A } from './path.js'

	const grid = getContext('p45-grid')

	export let from // "xy"
	export let to // "xy"
	export let radius // = { x: 0, y: 0 }
	export let rotate = 0
	export let large = false
	export let clockwise = false

	const f = grid.nodeOf(from)
	const t = grid.nodeOf(to)
</script>

<Path
	{...$$restProps}
	d={[
		M(f), //
		A(
			radius, //
			t, //
			{ rotate, large, clockwise } //
		),
	]} />
