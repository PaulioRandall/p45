<script>
	import { getContext } from 'svelte'

	const grid = getContext('grid')

	export let origin = grid.center
</script>

<text {...$$restProps} x={origin.x} y={origin.y}>
	<slot />
</text>

<style>
	text {
		user-select: none;
	}
</style>
