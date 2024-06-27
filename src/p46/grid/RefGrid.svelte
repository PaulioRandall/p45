<script>
	import Points from './Points.svelte'
	import Guidelines from './Guidelines.svelte'
	import Axis from './Axis.svelte'
	import Hitboxes from './Hitboxes.svelte'
	import Target from './Target.svelte'

	export let p45
	export let points
	export let selected

	export let guidelinesEnabled
	export let axisEnabled
	export let pointsEnabled
	export let targetEnabled
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 {p45.size + 2} {p45.size + 2}"
	preserveAspectRatio="xMidYMid"
	aria-hidden="true"
	stroke="transparent"
	fill="darkgrey"
	class="p46-ref-grid">
	{#if guidelinesEnabled}
		<Guidelines {p45} {points} />
	{/if}

	{#if axisEnabled}
		<Axis {p45} {points} />
	{/if}

	{#if pointsEnabled}
		<Points {points} />
	{/if}

	<g transform="translate(1,1)">
		<slot />
	</g>

	<Hitboxes {points} bind:selected />

	{#if targetEnabled}
		<Target {p45} {selected} />
	{/if}
</svg>
