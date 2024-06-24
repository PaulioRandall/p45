<script>
	import { getContext } from 'svelte'
	import RefGridContext from './RefGridContext.svelte'

	const p45 = getContext('p45')

	const pointsStore = getContext('p45-ref-grid-points-store')
	const selectedStore = getContext('p45-ref-grid-selected-store')
	const controlStore = getContext('p45-ref-grid-control-store')
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 {p45.size + 1} {p45.size + 1}"
	preserveAspectRatio="xMidYMid"
	aria-hidden="true"
	stroke="white"
	fill="transparent"
	class="p45-ref-grid-svg">
	{#if $controlStore.guidelinesEnabled}
		<RefGridContext />
	{/if}

	<g stroke="transparent" fill="darkgrey" class="p45-ref-grid-nodes">
		{#each $pointsStore as p (p.node)}
			{#if $controlStore.nodeNamesEnabled}
				<text x={p.textPos.x} y={p.textPos.y} class="p45-ref-grid-node-text">
					{p.node}
				</text>
			{/if}
			{#if $controlStore.pointsEnabled}
				<circle
					class="p45-ref-grid-node-circle"
					r="0.1"
					cx={p.dotPos.x}
					cy={p.dotPos.y} />
			{/if}
		{/each}
		{#each $pointsStore as p (p.node)}
			<rect
				x={p.hitBoxPos.x}
				y={p.hitBoxPos.y}
				width="1"
				height="1"
				fill="transparent"
				stroke="transparent"
				stroke-width="0.1"
				class="p45-ref-grid-node-hitbox"
				on:click={() => ($selectedStore = p)} />
		{/each}
		<rect
			x={$selectedStore.x}
			y={$selectedStore.y}
			width="1"
			height="1"
			rx="0.35"
			fill="transparent"
			stroke-width="0.2"
			stroke-dasharray="0.13"
			class="p45-ref-grid-node-selected" />
	</g>
</svg>

<style>
	.p45-ref-grid-node-hitbox {
		cursor: pointer;
	}

	.p45-ref-grid-node-text {
		text-anchor: middle;
		dominant-baseline: middle;
		font-size: 0.4px;

		user-select: none;
		pointer-events: none;
	}

	.p45-ref-grid-node-circle {
		pointer-events: none;
	}

	.p45-ref-grid-node-selected {
		stroke: crimson;
		pointer-events: none;
	}
</style>
