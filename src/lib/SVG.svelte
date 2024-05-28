<script>
	import { setContext } from 'svelte'

	export let grid

	setContext('p45-grid', grid)
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {grid.size} {grid.size}"
	{...$$restProps}>
	<slot />
</svg>
