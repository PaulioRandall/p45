import Victor from 'victor'
import Grid from '../grid/Grid.js'
import { toNumber } from './Parse.js'

export const RegPoly = Object.freeze({
	totalInternalAngle(n) {
		return 180 * (n - 2)
	},

	internalAngle(n) {
		return (180 * (n - 2)) / n
	},

	points(sides, radius, options = {}) {
		const { origin = { x: 0, y: 0 }, rotate = 0 } = options

		const angle = 360 / sides
		const points = new Array(sides)

		for (let i = 0; i < sides; i++) {
			points[i] = makePoint(i, angle, radius, origin, rotate)
		}

		return points
	},

	offset(ref, n) {
		switch (toNumber(ref, n)) {
			case 3:
				return { x: 0, y: Grid.UNIT * 1.5 }
			case 5:
				return { x: 0, y: Grid.UNIT * 0.75 }
			case 7:
				return { x: 0, y: Grid.UNIT * 0.3525 }
			default:
				return { x: 0, y: 0 }
		}
	},
})

const makePoint = (i, angle, radius, origin, rotate) => {
	const v = new Victor(0, radius)
	v.rotateDeg(angle * i - rotate)
	v.add(origin)
	return v.toObject()
}
