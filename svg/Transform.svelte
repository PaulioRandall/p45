<script>
	import { getContext } from 'svelte'
	import P45Util from '../grid/P45Util.js'

	// Transform component encapsulates slotted
	// content with a `<g>` element and applies
	// user transformations.
	//
	// Transform is designed for speed-of-expression,
	// that is, it's designed for the 90% of cases
	// where you want to do one or two quick commands,
	// i.e. flip, scale, skew, rotate, or offset.
	//
	// It can't perform every possible ordered set of
	// transformations because the order of operations
	// is fixed and most commands use the center of
	// the grid as the origin. This is just another
	// one of those trade-offs I've made in favour of
	// speed-of-expression.

	export let offsetX = null
	export let offsetY = null
	export let offsetXY = null

	export let scaleX = null
	export let scaleY = null
	export let scaleXY = null

	export let skewX = null
	export let skewY = null
	export let skewXY = null

	export let flipX = false
	export let flipY = false
	export let flipXY = false

	export let rotateCW = null
	export let rotateCCW = null

	const grid = getContext('grid')
	const center = grid.center

	const orNum = (n, defaultN = 0) => {
		n = P45Util.parseNumber(n)
		return isNaN(n) ? defaultN : n
	}

	const toXY = (x, y, xy, defaultX, defaultY) => {
		x = orNum(x, xy)
		y = orNum(y, xy)
		x = orNum(x, defaultX)
		y = orNum(y, defaultY)

		if (x === defaultX && y === defaultY) {
			return null
		}

		return { x, y }
	}

	const generateMatrix = () => {
		// If only we could use SVGTransformList
		// and generate a matrix :(
		const list = []

		const offset = toXY(offsetX, offsetY, offsetXY, 0, 0)
		const scale = toXY(scaleX, scaleY, scaleXY, 1, 1)
		const skew = toXY(skewX, skewY, skewXY, 0, 0)

		const applySkew = (x, y) => {
			if (x) {
				list.push(`skewX(${x})`)
			}

			if (y) {
				list.push(`skewY(${y})`)
			}
		}

		const applyOffset = (x, y) => {
			list.push(`translate(${x}, ${y})`)
		}

		const applyScale = (x, y) => {
			list.push(`scale(${x}, ${y})`)
		}

		const applyRotate = (deg) => {
			list.push(`rotate(${deg}, ${center.x}, ${center.y})`)
		}

		applyOffset(center.x, center.y)

		if (flipX || flipY || flipXY) {
			applyScale(
				flipX || flipXY ? -1 : 1, //
				flipY || flipXY ? -1 : 1 //
			)
		}

		if (scale) {
			applyScale(scale.x, scale.y)
		}

		if (skew) {
			applySkew(skew.x, skew.y)
		}

		applyOffset(-center.x, -center.y)

		if (rotateCW) {
			applyRotate(rotateCW)
		} else if (rotateCCW) {
			applyRotate(-rotateCCW)
		}

		if (offset) {
			applyOffset(offset.x, offset.y)
		}

		return list.join(' ')
	}

	$: transform = generateMatrix(
		offsetX,
		offsetY,
		offsetXY,
		scaleX,
		scaleY,
		scaleXY,
		skewX,
		skewY,
		skewXY,
		rotateCW,
		rotateCCW,
		flipX,
		flipY
	)
</script>

<g {transform}>
	<slot />
</g>
