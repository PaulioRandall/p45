<script>
	export let topLeft // { x: 0, y: 0 }
	export let botRight // { x: 0, y: 0 }
</script>

<rect
	{...$$restProps}
	x={topLeft.x}
	y={topLeft.y}
	width={botRight.x - topLeft.x}
	height={botRight.y - topLeft.y}
	on:* />
