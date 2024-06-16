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

	if (r.is('quadratic') || r.is('quad') || r.is('q')) {
		return parseQuadraticCurve(r)
	}

	if (r.is('cubic') || r.is('curve')) {
		return parseCubicCurve(r)
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

const parseQuadraticCurve = (r) => {
	r.expect('q', 'quad', 'quadratic')
	r.expect('curve')
	r.expect('to')

	const n = parseNode(r.read())

	if (r.empty()) {
		return `T ${n.x} ${n.y}`
	}

	r.expect('with')
	r.expect('slope')

	const cp = parseNode(r.read())
	return `Q ${cp.x} ${cp.y}, ${n.x} ${n.y}`
}

const parseCubicCurve = (r) => {
	r.accept('cubic')
	r.expect('curve')
	r.expect('to')

	const n = parseNode(r.read())

	r.expect('with')

	if (r.accept('slope')) {
		return parseCubicSymmetricCurve(r, n)
	} else if (r.accept('slopes')) {
		return parseCubicNonSymmetricCurve(r, n)
	}

	throw new Error(`Unable to determine cubic curve parameters`)
}

const parseCubicSymmetricCurve = (r, n) => {
	const cp = parseNode(r.read())
	return `S ${cp.x} ${cp.y}, ${n.x} ${n.y}`
}

const parseCubicNonSymmetricCurve = (r, n) => {
	const cp1 = parseNode(r.read())
	r.expect('and')
	const cp2 = parseNode(r.read())
	return `C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${n.x} ${n.y}`
}

export default parse
