import Victor from 'victor'
import P45Util from './P45Util.js'

const P45RegPoly = Object.freeze({
	// totalInternalAngle calculates the total internal angle of a regular
	// polygon with n sides.
	totalInternalAngle(n) {
		return 180 * (n - 2)
	},

	// internalAngle calculates a single internal angle of a regular polyong with
	// n sides.
	internalAngle(n) {
		return (180 * (n - 2)) / n
	},

	// points generates an array of points, in the form { x, y }, that represent
	// a regular polygon.
	points(sides, radius, options = {}) {
		const {
			origin = { x: 0, y: 0 }, //
			rotate = 0, //
		} = options

		const angle = 360 / sides
		const points = new Array(sides)

		for (let i = 0; i < sides; i++) {
			points[i] = makePoint(i, angle, radius, origin, rotate)
		}

		return points
	},

	/*
	offset(ref, n) {
		switch (P45Util.parseNumber(ref, n)) {
			case 3:
				return { x: 0, y: P45Grid.UNIT * 1.5 }
			case 5:
				return { x: 0, y: P45Grid.UNIT * 0.75 }
			case 7:
				return { x: 0, y: P45Grid.UNIT * 0.3525 }
			default:
				return { x: 0, y: 0 }
		}
	},
	*/
})

const makePoint = (i, angle, radius, origin, rotate) => {
	const v = new Victor(0, radius)
	v.rotateDeg(angle * i - rotate)
	v.add(origin)

	const p = v.toObject()
	p.x = P45Util.roundTo(p.x)
	p.y = P45Util.roundTo(p.y)

	return p
}

export default P45RegPoly
