<script context="module">
	const generatePoints = (p45) => {
		const points = []

		for (let x = 0; x < p45.size + 1; x++) {
			for (let y = 0; y < p45.size + 1; y++) {
				points.push({
					x,
					y,
					center: {
						x: x + 1,
						y: y + 1,
					},
					topLeft: {
						x: x + 0.5,
						y: y + 0.5,
					},
					node: p45.nodeOf(x, y),
				})
			}
		}

		return points
	}
</script>

<script>
	import { setContext } from 'svelte'

	import RefGridHeader from './private/ref-grid/RefGridHeader.svelte'
	import RefGridPoints from './private/ref-grid/RefGridPoints.svelte'
	import RefGridGuidelines from './private/ref-grid/RefGridGuidelines.svelte'
	import RefGridAxis from './private/ref-grid/RefGridAxis.svelte'
	import RefGridHitboxes from './private/ref-grid/RefGridHitboxes.svelte'
	import RefGridTarget from './private/ref-grid/RefGridTarget.svelte'

	//@prop p45
	// P45 instance to use as grid and context.
	// @default getContext('p45')
	export let p45 = getContext('p45')

	//@prop selected
	// The selected node.
	export const points = generatePoints(p45)

	//@prop selected
	// The selected node.
	// @default Grid.centerNode
	export let selected = points.find((p) => {
		return p.x === p45.center && p.y === p45.center
	})

	let pointsEnabled = true
	let guidelinesEnabled = true
	let targetEnabled = true
	let axisEnabled = true

	//@ctx p45
	// P45 instance used to size the icon and parse nodes.
	setContext('p45', p45)
</script>

<div class="p45-ref-grid">
	<RefGridHeader
		{selected}
		bind:pointsEnabled
		bind:guidelinesEnabled
		bind:targetEnabled
		bind:axisEnabled />
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 {p45.size + 2} {p45.size + 2}"
		preserveAspectRatio="xMidYMid"
		aria-hidden="true"
		stroke="white"
		fill="transparent"
		class="p45-ref-grid-svg">
		<g stroke="transparent" fill="darkgrey" class="p45-ref-grid-nodes">
			{#if guidelinesEnabled}
				<RefGridGuidelines {p45} {points} />
			{/if}

			{#if axisEnabled}
				<RefGridAxis {p45} {points} />
			{/if}

			{#if pointsEnabled}
				<RefGridPoints {points} />
			{/if}

			<g transform="translate(1,1)">
				<slot />
			</g>

			<RefGridHitboxes {points} bind:selected />

			{#if targetEnabled}
				<RefGridTarget {p45} {selected} />
			{/if}
		</g>
	</svg>
</div>
