<script>
	import { setContext } from 'svelte'

	export let grid
	export let title = undefined
	export let description = undefined

	if (!grid) {
		throw new Error("[P45:SVG] Dude, where's my grid prop?!")
	}

	setContext('grid', grid)
	setContext('title', title)
	setContext('description', description)
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 {grid.lenPx} {grid.lenPx}"
	preserveAspectRatio="xMidYMid"
	fill="transparent"
	stroke="grey"
	stroke-width="1"
	{...$$restProps}>
	{#if title}
		<title>{title}</title>
	{/if}
	{#if description}
		<description>{description}</description>
	{/if}
	<slot />
</svg>

<style>
	svg {
		max-width: 100%;
		max-height: 100%;
		overflow: visible;
	}
</style>
