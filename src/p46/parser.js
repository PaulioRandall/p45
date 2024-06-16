import TokenReader from './TokenReader.js'
import parseCoordNode from './node-parser.js'

const parse = (shape, cmd) => {
	const r = new TokenReader(cmd)

	if (r.is('move')) {
		return parseMove(shape, r)
	}

	if (r.is('close')) {
		return parseClose(shape, r)
	}

	r.accept('draw')
	return parseDraw(shape, r)
}

const parseMove = (shape, r) => {
	r.expect('move')
	r.expect('to')

	const n = parseNode(shape, r)
	shape.setStart(n)
	return `M ${n.x} ${n.y}`
}

const parseClose = (shape, r) => {
	r.expect('close')
	r.accept('path')

	shape.setPos(shape.getStart())
	return `Z`
}

const parseDraw = (shape, r) => {
	if (r.is('straight') || r.is('line')) {
		return parseDrawStraightLine(shape, r)
	}

	if (r.is('quadratic') || r.is('quad') || r.is('q')) {
		return parseQuadraticCurve(shape, r)
	}

	if (r.is('cubic') || r.is('curve')) {
		return parseCubicCurve(shape, r)
	}

	return []
}

const parseDrawStraightLine = (shape, r) => {
	r.accept('straight')
	r.expect('line')
	r.expect('to')

	const n = parseNode(shape, r)
	shape.setPos(n)
	return `L ${n.x} ${n.y}`
}

const parseQuadraticCurve = (shape, r) => {
	r.expect('q', 'quad', 'quadratic')
	r.expect('curve')
	r.expect('to')

	const n = parseNode(shape, r)

	if (r.empty()) {
		shape.setPos(n)
		return `T ${n.x} ${n.y}`
	}

	r.expect('with')
	r.expect('slope')

	const cp = parseNode(shape, r)
	shape.setPos(n)
	return `Q ${cp.x} ${cp.y}, ${n.x} ${n.y}`
}

const parseCubicCurve = (shape, r) => {
	r.accept('cubic')
	r.expect('curve')
	r.expect('to')

	const n = parseNode(shape, r)

	r.expect('with')

	if (r.accept('slope')) {
		return parseCubicSymmetricCurve(shape, r, n)
	} else if (r.accept('slopes')) {
		return parseCubicNonSymmetricCurve(shape, r, n)
	}

	throw new Error(`Unable to determine cubic curve parameters`)
}

const parseCubicSymmetricCurve = (shape, r, n) => {
	const cp = parseNode(shape, r)
	shape.setPos(n)
	return `S ${cp.x} ${cp.y}, ${n.x} ${n.y}`
}

const parseCubicNonSymmetricCurve = (shape, r, n) => {
	const cp1 = parseNode(shape, r)
	r.expect('and')
	const cp2 = parseNode(shape, r)
	shape.setPos(n)
	return `C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${n.x} ${n.y}`
}

const parseNode = (shape, r) => {
	if (r.is('start')) {
		return shape.getStart()
	}

	if (r.is('center')) {
		return shape.getCenter()
	}

	return parseCoordNode(r.read())
}

export default parse
