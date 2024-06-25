<script>
	import P45 from '$lib/P45'
	import Shape from '$lib/Shape.svelte'
	import Circle from '$lib/Circle.svelte'
	import RefGrid from '$lib/RefGrid.svelte'

	const p45 = new P45(24)

	let draw = [
		'move to U2',
		'quad curve to M22 with slope V16',
		'quad curve to E2 with slope D16',
		'quad curve to U2 with slope M8',
		'close',
	].join('\n')

	$: rows = draw.split('\n').length
</script>

<RefGrid {p45}>
	<Shape {draw} />
	<Shape
		stroke="black"
		stroke-width="0.5"
		draw="
		move to K18
		line to O18
		move to M18
		line to M13
		line to R7
		move to M13
		line to H7
		move to I8
		quad curve to M8 with slope K7
		quad curve to Q8
		line to R7
	" />
</RefGrid>

<textarea class="shape-command-input" {rows} bind:value={draw} />

<style>
	.shape-command-input {
		resize: vertical;
		padding: 1rem;
		font-size: 1rem;
	}
</style>
