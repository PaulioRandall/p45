<script>
	import { setContext } from 'svelte'
	import Shape from '$lib/Shape.svelte'
	import Header from './header/Header.svelte'
	import RefGrid from './grid/RefGrid.svelte'
	import InputTabs from './input/InputTabs.svelte'
	import generatePoints from './generate-points'

	//@prop p45
	// P45 instance to use as grid and context.
	// @default getContext('p45')
	export let p45
	setContext('p45', p45)

	const points = generatePoints(p45)

	//@prop selected
	// The selected node.
	// @default Grid.centerNode
	let selected = points.find((p) => {
		return p.x === p45.center && p.y === p45.center
	})

	let pointsEnabled = true
	let guidelinesEnabled = true
	let targetEnabled = true
	let axisEnabled = true

	let shapes
</script>

<div class="p46">
	<Header
		{selected}
		bind:pointsEnabled
		bind:guidelinesEnabled
		bind:targetEnabled
		bind:axisEnabled />
	<RefGrid
		{p45}
		{points}
		{selected}
		{pointsEnabled}
		{guidelinesEnabled}
		{targetEnabled}
		{axisEnabled}>
		{#if shapes}
			{#each Object.entries(shapes) as [id, draw] (id)}
				<Shape {draw} fill="transparent" />
			{/each}
		{/if}
	</RefGrid>
	<InputTabs bind:shapes />
</div>
