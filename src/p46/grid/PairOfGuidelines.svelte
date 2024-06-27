<script>
	export let size
	export let pos
</script>

<line
	x1="1"
	y1={pos + 1}
	x2={size + 1}
	y2={pos + 1}
	stroke="RebeccaPurple"
	stroke-width="0.15"
	stroke-dasharray="0.125"
	class="p46-ref-grid-guideline" />

<line
	y1="1"
	x1={pos + 1}
	y2={size + 1}
	x2={pos + 1}
	stroke="RebeccaPurple"
	stroke-width="0.15"
	stroke-dasharray="0.125"
	class="p46-ref-grid-guideline" />
