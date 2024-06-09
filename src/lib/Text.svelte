<script>
	import { getContext } from 'svelte'

	/*@component
		The `<Text>` component renders text.
	*/

	const g = getContext('p45-grid')

	//@prop point
	// Node to render the text at.
	// @default "E4"
	// @alias p
	export let p = 'E4'
	export let point = p

	const coords = g.parse(point)
</script>

<text {...$$restProps} x={coords.x} y={coords.y}>
	<!--@slot
		Text and associated SVG text elements.
	-->
	<slot />
</text>

<style>
	text {
		user-select: none;
	}
</style>
