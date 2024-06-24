<script>
	import { getContext } from 'svelte'
	import RefGridGuidelines from './RefGridGuidelines.svelte'

	const p45 = getContext('p45')
	const pointsStore = getContext('p45-ref-grid-points-store')
</script>

<rect
	x={$pointsStore[0].dotPos.x}
	y={$pointsStore[0].dotPos.y}
	width={p45.size}
	height={p45.size}
	fill="transparent"
	stroke="MediumSlateBlue"
	stroke-width="0.15"
	stroke-dasharray="0 0.25 0.25"
	class="p45-ref-grid-border" />

{#if [8, 16, 24, 32, 48, 64].includes(p45.size)}
	<RefGridGuidelines size={p45.size} pos="4" />
{:else}
	<RefGridGuidelines size={p45.size} pos={p45.center} />
	<RefGridGuidelines size={p45.size} pos={p45.center} />
{/if}

{#if [16, 24, 32, 48, 64].includes(p45.size)}
	<RefGridGuidelines size={p45.size} pos="8" />
	<RefGridGuidelines size={p45.size} pos="12" />
{/if}

{#if [24, 32, 48, 64].includes(p45.size)}
	<RefGridGuidelines size={p45.size} pos="16" />
	<RefGridGuidelines size={p45.size} pos="20" />
{/if}

{#if [32, 48, 64].includes(p45.size)}
	<RefGridGuidelines size={p45.size} pos="24" />
	<RefGridGuidelines size={p45.size} pos="28" />
{/if}

{#if [48, 64].includes(p45.size)}
	<RefGridGuidelines size={p45.size} pos="32" />
	<RefGridGuidelines size={p45.size} pos="36" />
	<RefGridGuidelines size={p45.size} pos="40" />
	<RefGridGuidelines size={p45.size} pos="44" />
{/if}

{#if [64].includes(p45.size)}
	<RefGridGuidelines size={p45.size} pos="48" />
	<RefGridGuidelines size={p45.size} pos="52" />
	<RefGridGuidelines size={p45.size} pos="56" />
	<RefGridGuidelines size={p45.size} pos="60" />
{/if}
