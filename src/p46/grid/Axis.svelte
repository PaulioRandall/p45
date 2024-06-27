<script>
	export let p45
	export let points
</script>

{#each points as p (p.node)}
	{#if p.x === 0}
		<text
			x={p.center.x - 0.3}
			y={p.center.y - 0.1}
			text-anchor="end"
			dominant-baseline="middle"
			class="p46-ref-grid-axis">
			{p.y}
		</text>
	{/if}
	{#if p.y === 0}
		<text
			x={p.center.x}
			y={p.center.y - 0.5}
			text-anchor="middle"
			dominant-baseline="middle"
			class="p46-ref-grid-axis">
			{p45.numberToAlpha(p.x)}
		</text>
	{/if}
{/each}

<style>
	.p46-ref-grid-axis {
		font-size: 0.6px;

		user-select: none;
		pointer-events: none;
	}
</style>
