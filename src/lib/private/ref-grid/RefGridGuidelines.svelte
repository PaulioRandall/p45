<script>
	import RefGridGuidelinesPair from './RefGridGuidelinesPair.svelte'

	export let p45
	export let points
</script>

<rect
	x={points[0].center.x}
	y={points[0].center.y}
	width={p45.size}
	height={p45.size}
	fill="transparent"
	stroke="MediumSlateBlue"
	stroke-width="0.1"
	stroke-dasharray="0 0.25 0.25"
	class="p45-ref-grid-border" />

{#if [8, 16, 24, 32, 48, 64].includes(p45.size)}
	<RefGridGuidelinesPair size={p45.size} pos={4} />
{:else}
	<RefGridGuidelinesPair size={p45.size} pos={p45.center} />
	<RefGridGuidelinesPair size={p45.size} pos={p45.center} />
{/if}

{#if [16, 24, 32, 48, 64].includes(p45.size)}
	<RefGridGuidelinesPair size={p45.size} pos={8} />
	<RefGridGuidelinesPair size={p45.size} pos={12} />
{/if}

{#if [24, 32, 48, 64].includes(p45.size)}
	<RefGridGuidelinesPair size={p45.size} pos={16} />
	<RefGridGuidelinesPair size={p45.size} pos={20} />
{/if}

{#if [32, 48, 64].includes(p45.size)}
	<RefGridGuidelinesPair size={p45.size} pos={24} />
	<RefGridGuidelinesPair size={p45.size} pos={28} />
{/if}

{#if [48, 64].includes(p45.size)}
	<RefGridGuidelinesPair size={p45.size} pos={32} />
	<RefGridGuidelinesPair size={p45.size} pos={36} />
	<RefGridGuidelinesPair size={p45.size} pos={40} />
	<RefGridGuidelinesPair size={p45.size} pos={44} />
{/if}

{#if [64].includes(p45.size)}
	<RefGridGuidelinesPair size={p45.size} pos="48" />
	<RefGridGuidelinesPair size={p45.size} pos="52" />
	<RefGridGuidelinesPair size={p45.size} pos="56" />
	<RefGridGuidelinesPair size={p45.size} pos="60" />
{/if}
