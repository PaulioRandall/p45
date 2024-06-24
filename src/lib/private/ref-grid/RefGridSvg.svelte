<script>
	import { getContext } from 'svelte'
	import RefGridContext from './RefGridContext.svelte'
	import RefGridTarget from './RefGridTarget.svelte'

	const p45 = getContext('p45')

	const pointsStore = getContext('p45-ref-grid-points-store')
	const selectedStore = getContext('p45-ref-grid-selected-store')
	const controlStore = getContext('p45-ref-grid-control-store')
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 {p45.size + 2} {p45.size + 2}"
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
			{#if $controlStore.axisEnabled}
				{#if p.x === 0}
					<text
						x={p.dotPos.x - 0.3}
						y={p.dotPos.y - 0.1}
						text-anchor="end"
						dominant-baseline="middle"
						class="p45-ref-grid-axis">
						{p.y}
					</text>
				{/if}
				{#if p.y === 0}
					<text
						x={p.dotPos.x}
						y={p.dotPos.y - 0.5}
						text-anchor="middle"
						dominant-baseline="middle"
						class="p45-ref-grid-axis">
						{p45.numberToAlpha(p.x)}
					</text>
				{/if}
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

		<RefGridTarget />
	</g>
</svg>

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
