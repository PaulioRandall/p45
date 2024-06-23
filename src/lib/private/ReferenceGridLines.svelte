<script>
	export let size
	export let pos
</script>

<line
	x1="0.5"
	y1="{pos}.5"
	x2={size + 0.5}
	y2="{pos}.5"
	stroke="RebeccaPurple"
	stroke-width="0.15"
	stroke-dasharray="0.125" />

<line
	y1="0.5"
	x1="{pos}.5"
	y2={size + 0.5}
	x2="{pos}.5"
	stroke="RebeccaPurple"
	stroke-width="0.15"
	stroke-dasharray="0.125" />
