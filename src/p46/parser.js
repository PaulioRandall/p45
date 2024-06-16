import parseNode from './node-parser.js'

class TokenReader {
	constructor(cmd) {
		this.cmd = cmd
		this.idx = 0
	}

	back(n = 0) {
		this.idx += n
	}

	get() {
		if (this.idx > this.cmd.length) {
			throw new Error(`No more tokens! Token list length: ${this.cmd.length}`)
		}

		return this.cmd[this.idx]
	}

	is(s) {
		return this.get() === s
	}

	accept(s) {
		if (this.is(s)) {
			this.idx++
			return true
		}
		return false
	}

	expect(s) {
		const token = this.get()

		if (token === s) {
			this.idx++
			return token
		}

		throw new Error(
			`At token index ${this.idx}, expected '${s}' but got '${token}'`
		)
	}
}

const parse = (cmd) => {
	const r = new TokenReader(cmd)

	if (r.is('move')) {
		return parseMove(r)
	}

	if (r.is('straight') || r.is('line')) {
		return parseStraightLine(r)
	}

	return []
}

const parseMove = (r) => {
	r.expect('move')
	r.expect('to')
	const n = parseNode(r.get())
	return `M ${n.x} ${n.y}`
}

const parseStraightLine = (r) => {
	r.accept('straight')
	r.expect('line')
	r.expect('to')
	const n = parseNode(r.get())
	return `L ${n.x} ${n.y}`
}

export default parse
