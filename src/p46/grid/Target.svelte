<script>
	export let p45
	export let selected
</script>

{#if selected}
	{#if selected.center.x > 1}
		<line
			x1="1"
			y1={selected.center.y}
			x2={selected.center.x - 1}
			y2={selected.center.y}
			stroke="crimson"
			stroke-width="0.075"
			stroke-dasharray="0 0.25 0.25"
			class="p46-ref-grid-target-line" />
	{/if}

	{#if selected.center.x <= p45.size}
		<line
			x1={selected.center.x + 1}
			y1={selected.center.y}
			x2={p45.size + 1}
			y2={selected.center.y}
			stroke="crimson"
			stroke-width="0.075"
			stroke-dasharray="0 0.25 0.25"
			class="p46-ref-grid-target-line" />
	{/if}

	{#if selected.center.y > 1}
		<line
			x1={selected.center.x}
			y1="1"
			x2={selected.center.x}
			y2={selected.center.y - 1}
			stroke="crimson"
			stroke-width="0.075"
			stroke-dasharray="0 0.25 0.25"
			class="p46-ref-grid-target-line" />
	{/if}

	{#if selected.center.y <= p45.size}
		<line
			x1={selected.center.x}
			y1={selected.center.y + 1}
			x2={selected.center.x}
			y2={p45.size + 1}
			stroke="crimson"
			stroke-width="0.075"
			stroke-dasharray="0 0.25 0.25"
			class="p46-ref-grid-target-line" />
	{/if}

	<rect
		x={selected.topLeft.x - 0.125}
		y={selected.topLeft.y - 0.125}
		width="1.25"
		height="1.25"
		rx="1"
		fill="transparent"
		stroke="crimson"
		stroke-width="0.16"
		stroke-dasharray="0.17 0.314"
		class="p46-ref-grid-target-circle">
		<animateTransform
			attributeName="transform"
			type="rotate"
			begin="0s"
			dur="6s"
			from="0 {selected.center.x} {selected.center.y}"
			to="360 {selected.center.x} {selected.center.y}"
			repeatCount="indefinite" />
	</rect>
{/if}
