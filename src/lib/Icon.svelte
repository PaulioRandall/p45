<script>
	import { getContext, setContext } from 'svelte'

	/*@component
		Container for slotted shapes that form an Icon.

		It's represented by an svg element sized by the passed P45 instance.
		Raw svg child elements maybe slotted in too.
	*/

	//@prop p45
	// An instance of the P45 class.
	// @default getContext('p45')
	export let p45 = getContext('p45')

	//@prop title
	// The icon's title applied using the SVG title tag.
	// @default ""
	export let title = ''

	//@prop description
	// Description of the icon applied using the SVG description tag.
	// @default ""
	export let description = ''

	//@ctx p45
	// P45 instance used to size the icon and parse nodes.
	setContext('p45', p45)
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 {p45.size} {p45.size}"
	preserveAspectRatio="xMidYMid"
	aria-hidden="true"
	stroke="white"
	fill="transparent"
	stroke-linecap="round"
	stroke-linejoin="round"
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
