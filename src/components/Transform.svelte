<script>
	import { getContext } from 'svelte'
	import P45Util from '../grid/P45Util.js'

	// offset from the top left.
	// Default indicates no offset.
	export let offset = { x: 0, y: 0 }

	// scale from the center.
	// Default indicates no scaling.
	export let scale = { x: 1, y: 1 }

	// rotate clockwise in degrees around the icon center.
	export let rotate = 0

	// flipX flips on the x-axis from the center line.
	export let flipX = false

	// flipY flips on the y-axis from the center line.
	export let flipY = false

	const grid = getContext('grid')
	const center = grid.centerNode

	const orNum = (n, defaultN = 0) => {
		n = P45Util.parseNumber(n)
		return n ? n : defaultN
	}

	const makeTranslate = (x, y) => `translate(${x} ${y})`
	const makeRotate = (deg) => `rotate(${deg} ${center.x} ${center.y})`
	const makeScale = (x, y) => [
		makeTranslate(center.x, center.y), //
		`scale(${x} ${y})`,
		makeTranslate(-center.x, -center.y), //
	]
	const makeFlip = (x, y) => {
		x = x ? -1 : 1
		y = y ? -1 : 1
		return makeScale(x, y)
	}

	const makeTransform = () => {
		const transform = []

		if (flipX || flipY) {
			transform.push(...makeFlip(flipX, flipY))
		}

		const r = orNum(rotate, 0)
		if (r !== 0) {
			transform.push(makeRotate(r))
		}

		const offX = orNum(offset.x, 0)
		const offY = orNum(offset.y, 0)
		if (offX !== 0 || offY !== 0) {
			transform.push(makeTranslate(offX, offY))
		}

		const scaleX = orNum(scale.x, 1)
		const scaleY = orNum(scale.y, 1)
		if (scaleX !== 1 || scaleY !== 1) {
			transform.push(...makeScale(scaleX, scaleY))
		}

		return transform.join(' ')
	}

	$: transform = makeTransform(offset, scale, rotate, flipX, flipY)
</script>

<g {transform}>
	<slot />
</g>
