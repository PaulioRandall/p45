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
		return parseStraightLine(r)
	}

	if (r.is('curved')) {
		return parseCurvedLine(r)
	}

	return []
}

const parseStraightLine = (r) => {
	r.accept('straight')
	r.expect('line')
	r.expect('to')

	const n = parseNode(r.read())
	return `L ${n.x} ${n.y}`
}

const parseCurvedLine = (r) => {
	r.expect('curved')
	r.expect('line')
	r.expect('to')

	const n = parseNode(r.read())

	r.expect('with')

	if (r.accept('slope')) {
		return quadraticLine(r, n)
	}
}

const quadraticLine = (r, n) => {
	const s = parseNode(r.read())
	return `Q ${n.x} ${n.y}, ${s.x} ${s.y}`
}

export default parse
