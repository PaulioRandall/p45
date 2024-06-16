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

	if (r.is('quadratic') || r.is('quad')) {
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
	r.expect('quadratic', 'quad')
	r.expect('curve')
	r.expect('to')

	const n = parseNode(r.read())

	if (r.empty()) {
		return `T ${n.x} ${n.y}`
	}

	r.expect('with')
	r.expect('slope')

	const cp = parseNode(r.read())
	return `Q ${n.x} ${n.y}, ${cp.x} ${cp.y}`
}

const parseCubicCurve = (r) => {
	r.accept('cubic')
	r.expect('curve')
	r.expect('to')

	const n = parseNode(r.read())

	r.expect('with')

	if (r.accept('slope')) {
		const cp = parseNode(r.read())
		return `S ${n.x} ${n.y}, ${cp.x} ${cp.y}`
	} else if (r.accept('slopes')) {
		const cp1 = parseNode(r.read())
		r.expect('and')
		const cp2 = parseNode(r.read())

		return `C ${n.x} ${n.y}, ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}`
	}

	throw new Error(`Unable to determine cubic curve parameters`)
}

export default parse
