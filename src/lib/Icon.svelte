<script>
	import { getContext, setContext } from 'svelte'

	/*p24.description:
		The **Icon** component is a container for slotted shapes that form an
		Icon.

		It's represented by an svg element sized by the passed grid. This means
		raw svg child elements maybe slotted in too.
	*/

	//p24.p.let.g: Alias for grid.
	//p24.p.let.grid: An instance of the Grid class.
	//p24.d.p.let.grid: getContext('p45-grid')
	export let g = getContext('p45-grid')
	export let grid = g

	//p24.p.let.title: The icon's title applied using the SVG title tag.
	//p24.d.p.let.title: ""
	export let title = ''

	//p24.p.let.description:
	// Description of the icon applied using the SVG description tag.
	//p24.d.p.let.description: ""
	export let description = ''

	//p24.ctx.p45-grid: Grid used to size the icon and parse nodes.
	setContext('p45-grid', grid)
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 {grid.size} {grid.size}"
	preserveAspectRatio="xMidYMid"
	aria-hidden="true"
	stroke="white"
	fill="transparent"
	{...$$restProps}>
	{#if title}
		<title>{title}</title>
	{/if}
	{#if description}
		<description>{description}</description>
	{/if}
	<slot />
</svg>
