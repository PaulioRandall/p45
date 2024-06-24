<script>
	import { getContext } from 'svelte'

	const p45 = getContext('p45')
	const selectedStore = getContext('p45-ref-grid-selected-store')
</script>

<line
	x1="1"
	y1={$selectedStore.dotPos.y}
	x2={$selectedStore.dotPos.x - 1}
	y2={$selectedStore.dotPos.y}
	stroke="crimson"
	stroke-width="0.075"
	stroke-dasharray="0 0.25 0.25"
	class="p45-ref-grid-selected-guideline" />

<line
	x1={$selectedStore.dotPos.x + 1}
	y1={$selectedStore.dotPos.y}
	x2={p45.size + 1}
	y2={$selectedStore.dotPos.y}
	stroke="crimson"
	stroke-width="0.075"
	stroke-dasharray="0 0.25 0.25"
	class="p45-ref-grid-selected-guideline" />

<line
	x1={$selectedStore.dotPos.x}
	y1="1"
	x2={$selectedStore.dotPos.x}
	y2={$selectedStore.dotPos.y - 1}
	stroke="crimson"
	stroke-width="0.075"
	stroke-dasharray="0 0.25 0.25"
	class="p45-ref-grid-selected-guideline" />

<line
	x1={$selectedStore.dotPos.x}
	y1={$selectedStore.dotPos.y + 1}
	x2={$selectedStore.dotPos.x}
	y2={p45.size + 1}
	stroke="crimson"
	stroke-width="0.075"
	stroke-dasharray="0 0.25 0.25"
	class="p45-ref-grid-selected-guideline" />

<rect
	x={$selectedStore.hitBoxPos.x - 0.125}
	y={$selectedStore.hitBoxPos.y - 0.125}
	width="1.25"
	height="1.25"
	rx="1"
	fill="transparent"
	stroke="crimson"
	stroke-width="0.16"
	stroke-dasharray="0.17 0.314"
	class="p45-ref-grid-node-selected">
	<animateTransform
		attributeName="transform"
		type="rotate"
		begin="0s"
		dur="6s"
		from="0 {$selectedStore.dotPos.x} {$selectedStore.dotPos.y}"
		to="360 {$selectedStore.dotPos.x} {$selectedStore.dotPos.y}"
		repeatCount="indefinite" />
</rect>

<style>
	.p45-ref-grid-node-hitbox {
		cursor: pointer;
	}

	.p45-ref-grid-axis {
		font-size: 0.6px;

		user-select: none;
		pointer-events: none;
	}

	.p45-ref-grid-node-circle {
		pointer-events: none;
	}

	.p45-ref-grid-node-selected {
		pointer-events: none;
	}
</style>
