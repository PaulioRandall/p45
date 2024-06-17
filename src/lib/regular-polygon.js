import Victor from 'victor'
import { parseNode, nodeOf } from 'p46'

export const parseInt2 = (n) => {
	return Math.round(Number(n))
}

export const parseFloat2 = (n) => {
	return roundTo(Number(n))
}

export const generatePath = (origin, sides, radius, rotate) => {
	return (
		generateVertices(origin, sides, radius, rotate) //
			.map(({ x, y }) => `${x},${y}`)
			.join(' ') + ' Z'
	)
}

export const generateVertices = (origin, sides, radius, rotate) => {
	if (typeof origin === 'string') {
		origin = parseNode(origin)
	}

	sides = parseInt2(sides)
	radius = parseFloat2(radius)
	rotate = parseFloat2(rotate)

	const angle = 360 / sides
	const points = new Array(sides)

	for (let i = 0; i < sides; i++) {
		points[i] = makePoint(i, angle, radius, origin, rotate)
	}

	return points
}

const makePoint = (i, angle, radius, origin, rotate) => {
	const v = new Victor(0, radius)
	v.rotateDeg(angle * i - rotate)
	v.add(origin)

	const p = v.toObject()
	p.x = roundTo(p.x)
	p.y = roundTo(p.y)
	return p
}

const roundTo = (n, dp = 3) => {
	const mod = Math.pow(10, dp)
	return Math.round(n * mod) / mod
}

export default generateVertices
