<script>
	import Path, { J, M, A } from './Path.svelte'

	export let from // = node
	export let to // = node
	export let r //
	export let rotate = 0
	export let large = false
	export let clockwise = false
	export let rel = false
</script>

<Path
	{...$$restProps}
	d={J(
		M(from), //
		A(
			r, //
			to, //
			{ rotate, large, clockwise, rel } //
		)
	)} />
