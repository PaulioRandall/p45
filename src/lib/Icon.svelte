<script>
	import { getContext, setContext } from 'svelte'

	/*@component
		The `<Icon>` component is a container for slotted shapes that form an
		Icon.

		It's represented by an svg element sized by the passed grid. This means
		raw svg child elements maybe slotted in too.
	*/

	//@prop grid
	// An instance of the Grid class.
	// @default getContext('p45-grid')
	// @alias g
	export let g = getContext('p45-grid')
	export let grid = g

	//@prop title
	// The icon's title applied using the SVG title tag.
	// @default ""
	export let title = ''

	//@prop description
	// Description of the icon applied using the SVG description tag.
	// @default ""
	export let description = ''

	//@ctx p45-grid
	// Grid used to size the icon and parse nodes.
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
	<!--@slot
		SVG elments and components that form the icon.
	-->
	<slot />
</svg>
