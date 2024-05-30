<script>
	import { setContext } from 'svelte'

	//p24.p.let.g: Alias for grid.
	//p24.p.let.grid: An instance of the Grid class.
	export let g
	export let grid = g

	setContext('p45-grid', grid)
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {grid.size} {grid.size}"
	stroke="white"
	fill="transparent"
	{...$$restProps}>
	<slot />
</svg>
