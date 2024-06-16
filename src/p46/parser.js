import TokenReader from './TokenReader.js'
import parseNode from './node-parser.js'

const parse = (cmd) => {
	const r = new TokenReader(cmd)

	if (r.is('move')) {
		return parseMove(r)
	}

	r.accept('draw')
	return parseDraw(r)
}

const parseMove = (r) => {
	r.expect('move')
	r.expect('to')

	const n = parseNode(r.read())
	return `M ${n.x} ${n.y}`
}

const parseDraw = (r) => {
	if (r.is('straight') || r.is('line')) {
		return parseDrawStraightLine(r)
	}

	if (r.is('continue') || r.is('curved')) {
		return parseDrawCurvedLine(r)
	}

	return []
}

const parseDrawStraightLine = (r) => {
	r.accept('straight')
	r.expect('line')
	r.expect('to')

	const n = parseNode(r.read())
	return `L ${n.x} ${n.y}`
}

const parseDrawCurvedLine = (r) => {
	const symmetry = r.accept('continue')

	if (symmetry) {
		r.accept('drawing')
	}

	r.expect('curved')
	r.expect('line')
	r.expect('to')

	const n = parseNode(r.read())
	return parseCurveSlope(r, symmetry, n)
}

const parseCurveSlope = (r, symmetry, n) => {
	if (r.empty()) {
		return continuedQuadraticCurve(r, n)
	}

	r.expect('with')

	if (r.accept('slopes')) {
		return cubicCurve(r, n)
	}

	if (!symmetry && r.accept('slope')) {
		return quadraticCurve(r, n)
	}

	if (symmetry && r.accept('slope')) {
		return continuedCubicCurve(r, n)
	}

	throw new Error(`Unable to determine curve type`)
}

const quadraticCurve = (r, n) => {
	const cp = parseNode(r.read())
	return `Q ${n.x} ${n.y}, ${cp.x} ${cp.y}`
}

const continuedQuadraticCurve = (r, n) => {
	return `T ${n.x} ${n.y}`
}

const cubicCurve = (r, n) => {
	const cp1 = parseNode(r.read())
	r.expect('and')
	const cp2 = parseNode(r.read())
	return `C ${n.x} ${n.y}, ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}`
}

const continuedCubicCurve = (r, n) => {
	const cp = parseNode(r.read())
	return `S ${n.x} ${n.y}, ${cp.x} ${cp.y}`
}

export default parse
