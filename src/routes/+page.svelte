<script>
	import Grid from '$lib/Grid'
	import SVG from '$lib/SVG.svelte'
	import Circle from '$lib/Circle.svelte'

	const grid = new Grid(16)
</script>

<main>
	<div class="container">
		<SVG {grid}>
			<Circle o="I8" r="4" fill="red" />
		</SVG>
	</div>
</main>

<style>
	main {
		width: 100dvw;
		min-height: 100dvh;
		padding: 1rem;
		padding-bottom: 2rem;
	}

	.container {
		width: 100px;
		height: 100px;
	}
</style>
