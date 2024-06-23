<script>
	import ReferenceGridLines from './ReferenceGridLines.svelte'

	export let p45
	export let points
</script>

<rect
	x={points[0].dotPos.x}
	y={points[0].dotPos.y}
	width={p45.size}
	height={p45.size}
	fill="transparent"
	stroke="MediumSlateBlue"
	stroke-width="0.15"
	stroke-dasharray="0 0.25 0.25"
	class="p45-border" />

{#if [8, 16, 24, 32, 48, 64].includes(p45.size)}
	<ReferenceGridLines size={p45.size} pos="4" />
{:else}
	<ReferenceGridLines size={p45.size} pos={p45.center} />
	<ReferenceGridLines size={p45.size} pos={p45.center} />
{/if}

{#if [16, 24, 32, 48, 64].includes(p45.size)}
	<ReferenceGridLines size={p45.size} pos="8" />
	<ReferenceGridLines size={p45.size} pos="12" />
{/if}

{#if [24, 32, 48, 64].includes(p45.size)}
	<ReferenceGridLines size={p45.size} pos="16" />
	<ReferenceGridLines size={p45.size} pos="20" />
{/if}

{#if [32, 48, 64].includes(p45.size)}
	<ReferenceGridLines size={p45.size} pos="24" />
	<ReferenceGridLines size={p45.size} pos="28" />
{/if}

{#if [48, 64].includes(p45.size)}
	<ReferenceGridLines size={p45.size} pos="32" />
	<ReferenceGridLines size={p45.size} pos="36" />
	<ReferenceGridLines size={p45.size} pos="40" />
	<ReferenceGridLines size={p45.size} pos="44" />
{/if}

{#if [64].includes(p45.size)}
	<ReferenceGridLines size={p45.size} pos="48" />
	<ReferenceGridLines size={p45.size} pos="52" />
	<ReferenceGridLines size={p45.size} pos="56" />
	<ReferenceGridLines size={p45.size} pos="60" />
{/if}
