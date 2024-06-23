<script>
	import { setContext } from 'svelte'
	import ReferenceGridContext from './private/ReferenceGridContext.svelte'
	import Icon from './Icon.svelte'

	//@prop p45
	// An instance of the P45 class.
	export let p45

	const points = []

	for (let x = 0; x < p45.size + 1; x++) {
		for (let y = 0; y < p45.size + 1; y++) {
			points.push({
				x,
				y,
				pos: {
					x: x,
					y: y,
				},
				hitBoxPos: {
					x: x,
					y: y,
				},
				dotPos: {
					x: x + 0.5,
					y: y + 0.5,
				},
				textPos: {
					x: x + 0.5,
					y: y + 0.08,
				},
				node: p45.nodeOf(x, y),
			})
		}
	}

	//@prop selected
	// The selected node object.
	// @default { x: P45.center, y: P45.center }
	export let selected = points.find((p) => {
		return p.x === p45.center && p.y === p45.center
	})

	//@ctx p45
	// P45 instance used to size the icon and parse nodes.
	setContext('p45', p45)

	let nodeNamesOn = false
	const toggleNodeNames = () => {
		nodeNamesOn = !nodeNamesOn
	}

	let pointsOn = true
	const togglePoints = () => {
		pointsOn = !pointsOn
	}

	let guidelinesOn = true
	const toggleGuidelines = () => {
		guidelinesOn = !guidelinesOn
	}

	const copyText = (event) => {
		navigator?.clipboard?.writeText(event.target.textContent)

		const copiedElemId = event.target.dataset.copiedElementId
		if (!copiedElemId) {
			return
		}

		const elem = document.getElementById(copiedElemId)
		if (elem) {
			elem.style.visibility = 'visible'
			setTimeout(() => (elem.style.visibility = 'hidden'), 2500)
		}
	}
</script>

<div class="p45-reference-grid">
	<div class="p45-header">
		<div class="p45-header-row">
			<button class="p45-header-button" on:click={togglePoints}
				>Points <input type="checkbox" bind:checked={pointsOn} />
			</button>
			<button class="p45-header-button" on:click={toggleGuidelines}
				>Guidelines <input type="checkbox" bind:checked={guidelinesOn} />
			</button>
			<button class="p45-header-button" on:click={toggleNodeNames}
				>Node names <input type="checkbox" bind:checked={nodeNamesOn} />
			</button>
		</div>
		<div class="p45-header-row">
			<div>
				<button
					class="p45-header-button"
					data-copied-element-id="p45-header-button-left-copied"
					on:click={copyText}>
					{selected.node}
				</button>
				<span id="p45-header-button-left-copied">Copied</span>
			</div>
			<div>
				<span id="p45-header-button-right-copied">Copied</span>
				<button
					data-copied-element-id="p45-header-button-right-copied"
					class="p45-header-button"
					on:click={copyText}>{selected.x}:{selected.y}</button>
			</div>
		</div>
	</div>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 {p45.size + 1} {p45.size + 1}"
		preserveAspectRatio="xMidYMid"
		aria-hidden="true"
		stroke="white"
		fill="transparent">
		{#if guidelinesOn}
			<ReferenceGridContext {p45} {points} />
		{/if}
		<g stroke="transparent" fill="darkgrey" class="p45-nodes">
			{#each points as p (p.node)}
				{#if nodeNamesOn}
					<text x={p.textPos.x} y={p.textPos.y} class="p45-node-text">
						{p.node}
					</text>
				{/if}
				{#if pointsOn}
					<circle
						class="p45-node-circle"
						r="0.1"
						cx={p.dotPos.x}
						cy={p.dotPos.y} />
				{/if}
			{/each}
			{#each points as p (p.node)}
				<rect
					x={p.hitBoxPos.x}
					y={p.hitBoxPos.y}
					width="1"
					height="1"
					fill="transparent"
					stroke="transparent"
					stroke-width="0.1"
					class="p45-node-hitbox"
					on:click={() => (selected = p)} />
			{/each}
			{#if selected}
				<rect
					x={selected.x}
					y={selected.y}
					width="1"
					height="1"
					rx="0.35"
					fill="transparent"
					stroke-width="0.2"
					stroke-dasharray="0.13"
					class="p45-node-selected" />
			{/if}
		</g>
	</svg>
</div>

<style>
	.p45-reference-grid {
	}

	.p45-header {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		gap: 1rem;
	}

	.p45-header-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		gap: 1rem;
	}

	.p45-header-button {
		min-width: 5rem;
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		flex-grow: 1;
	}

	#p45-header-button-left-copied {
		visibility: hidden;
		padding: 0 0.5rem;
		color: darkgrey;
	}

	#p45-header-button-right-copied {
		visibility: hidden;
		padding: 0 0.5rem;
		color: darkgrey;
	}

	.p45-nodes {
	}

	.p45-node-hitbox {
		cursor: pointer;
	}

	.p45-node-text {
		text-anchor: middle;
		dominant-baseline: middle;
		font-size: 0.4px;

		user-select: none;
		pointer-events: none;
	}

	.p45-node-circle {
		pointer-events: none;
	}

	.p45-node-selected {
		stroke: crimson;
		pointer-events: none;
	}
</style>
