<script>
	import Path from './Path.svelte'
	import { M, A } from './path.js'

	export let from // = node
	export let to // = node
	export let radius // = { x: 0, y: 0 }
	export let rotate = 0
	export let large = false
	export let clockwise = false
</script>

<Path
	{...$$restProps}
	d={[
		M(from), //
		A(
			radius, //
			to, //
			{ rotate, large, clockwise } //
		),
	]} />
