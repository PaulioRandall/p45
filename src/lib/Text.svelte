<script>
	import { getContext } from 'svelte'

	/*p24.description:
		The **Text** component renders text.
	*/

	const g = getContext('p45-grid')

	//p24.p.let.p: Alias for point.
	//p24.p.let.point: Point to render the text.
	//p24.d.p.let.points: "E4"
	export let p = 'E4'
	export let point = p

	const coords = g.parse(point)
</script>

<text {...$$restProps} x={coords.x} y={coords.y}>
	<slot />
</text>

<style>
	text {
		user-select: none;
	}
</style>
