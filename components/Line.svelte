<script>
	export let from // { x: 0, y: 0 }
	export let to // { x: 0, y: 0 }
</script>

<line
	vector-effect="non-scaling-stroke"
	{...$$restProps}
	x1={from.x}
	y1={from.y}
	x2={to.x}
	y2={to.y} />
