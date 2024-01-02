<script>
	import { setContext } from 'svelte'

	export let grid
	export let offset = { x: 0, y: 0 }
	export let rotate = 0
	export let flipX = false
	export let flipY = false
	export let title = undefined

	if (!grid) {
		throw new Error("[P45:SVG] Dude, where's my grid property value?!")
	}

	const orZero = (n) => (n ? n : 0)

	const center = grid.centerNode
	const offX = orZero(offset.x)
	const offY = orZero(offset.y)

	const translateFunc = (x, y) => `translate(${x} ${y})`
	const rotateFunc = (deg) => `rotate(${deg} ${center.x} ${center.y})`
	const flipFunc = (x, y) => {
		x = x ? -1 : 1
		y = y ? -1 : 1
		return `scale(${x} ${y})`
	}

	setContext('grid', grid)
	setContext('offset', { x: offX, y: offY })
	setContext('rotate', rotate)
	setContext('flipX', flipX)
	setContext('flipY', flipY)
	setContext('title', title)

	// Order matters!
	$: transform = [
		translateFunc(center.x, center.y),
		flipFunc(flipX, flipY),
		translateFunc(offX - center.x, offY - center.y),
		rotateFunc(rotate),
	].join(' ')
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 {grid.lenPx} {grid.lenPx}"
	preserveAspectRatio="xMidYMid"
	fill="transparent"
	stroke="grey"
	stroke-width="3"
	{...$$restProps}>
	<title>{title}</title>
	<g {transform}>
		<slot />
	</g>
</svg>

<style>
	svg {
		max-width: 100%;
		max-height: 100%;
		overflow: visible;
	}
</style>
