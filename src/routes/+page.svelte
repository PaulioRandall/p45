<script>
	import Grid from '$lib/Grid'
	import SVG from '$lib/SVG.svelte'
	import Circle from '$lib/Circle.svelte'

	const grid = new Grid(16)
</script>

<main>
	<section class="icon-grid">
		<div class="container">
			<SVG {grid}>
				<Circle o="I8" r="4" fill="red" />
			</SVG>
		</div>
		<div class="container">
			<SVG {grid}>
				<Circle origin="I8" radius="4" fill="red" />
			</SVG>
		</div>
	</section>
</main>

<style>
	main {
		width: 100dvw;
		min-height: 100dvh;
		padding: 2rem;
	}

	.icon-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.container {
		width: 192px;
		height: 192px;
		border: 2px solid lightblue;
	}
</style>
