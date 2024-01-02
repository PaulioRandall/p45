<script>
	export let at = { x: 0, y: 0 }
</script>

<text {...$$restProps} x={at.x} y={at.y}>
	<slot />
</text>

<style>
	text {
		user-select: none;
	}
</style>
