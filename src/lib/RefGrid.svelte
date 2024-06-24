<script context="module">
	const generatePoints = (p45) => {
		const points = []

		for (let x = 0; x < p45.size + 1; x++) {
			for (let y = 0; y < p45.size + 1; y++) {
				points.push({
					x,
					y,
					pos: {
						x: x + 1,
						y: y + 1,
					},
					hitBoxPos: {
						x: x + 0.5,
						y: y + 0.5,
					},
					dotPos: {
						x: x + 1,
						y: y + 1,
					},
					textPos: {
						x: x + 1,
						y: y + 0.08,
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
	import { writable, readable } from 'svelte/store'

	import RefGridHeader from './private/ref-grid/RefGridHeader.svelte'
	import RegGridSvg from './private/ref-grid/RefGridSvg.svelte'

	//@prop p45
	// An instance of the P45 class.
	export let p45

	//@prop selected
	// The selected node.
	export const points = generatePoints(p45)

	//@prop selected
	// The selected node.
	// @default Grid.centerNode
	export let selected = points.find((p) => {
		return p.x === p45.center && p.y === p45.center
	})

	const pointsStore = readable(points)
	const selectedStore = writable(null)
	$: selectedStore.set(selected)

	const controlStore = writable({
		pointsEnabled: true,
		guidelinesEnabled: true,
		nodeNamesEnabled: false,
	})

	//@ctx p45
	// P45 instance used to size the icon and parse nodes.
	setContext('p45', p45)

	//@ctx p45-ref-grid-points-store
	// Readable store for communicating the points.
	setContext('p45-ref-grid-points-store', pointsStore)

	//@ctx p45-ref-grid-control-store
	// Writable store for controlling grid features.
	setContext('p45-ref-grid-control-store', controlStore)

	//@ctx p45-ref-grid-selected-store
	// Derived store for controlling grid features.
	setContext('p45-ref-grid-selected-store', selectedStore)
</script>

<div class="p45-ref-grid">
	<RefGridHeader />
	<RegGridSvg />
</div>
