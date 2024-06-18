import TokenReader from './TokenReader.js'
import NodeParser from './NodeParser.js'

export default class DrawCmdParser {
	constructor(gridSize = 0) {
		this.start = { x: 0, y: 0 }
		this.pos = { x: 0, y: 0 }
		this.size = { w: gridSize, h: gridSize }
		this.center = { x: gridSize / 2, y: gridSize / 2 }
	}

	parse(cmd) {
		const r = new TokenReader(cmd)

		if (r.is('move')) {
			return this.parseMove(r)
		}

		if (r.is('close')) {
			return this.parseClose(r)
		}

		return this.parseDraw(r)
	}

	parseMove(r) {
		r.expect('move')
		r.expect('to')

		const n = this.parseNode(r)
		this.start = n
		return `M ${n.x} ${n.y}`
	}

	parseClose(r) {
		r.expect('close')
		r.accept('path')

		this.pos = this.start
		return `Z`
	}

	parseDraw(r) {
		if (r.is('line')) {
			return this.parseDrawLine(r)
		}

		if (r.is('quadratic') || r.is('quad') || r.is('q')) {
			return this.parseQuadraticCurve(r)
		}

		if (r.is('cubic') || r.is('curve')) {
			return this.parseCubicCurve(r)
		}

		return []
	}

	parseDrawLine(r) {
		r.expect('line')
		r.expect('to')

		const n = this.parseNode(r)
		this.pos = n
		return `L ${n.x} ${n.y}`
	}

	parseQuadraticCurve(r) {
		r.expect('q', 'quad', 'quadratic')
		r.expect('curve')
		r.expect('to')

		const n = this.parseNode(r)

		if (r.empty()) {
			this.pos = n
			return `T ${n.x} ${n.y}`
		}

		r.expect('with')
		r.expect('slope')

		const cp = this.parseNode(r)
		this.pos = n
		return `Q ${cp.x} ${cp.y}, ${n.x} ${n.y}`
	}

	parseCubicCurve(r) {
		r.accept('cubic')
		r.expect('curve')
		r.expect('to')

		const n = this.parseNode(r)

		r.expect('with')

		if (r.accept('slope')) {
			return this.parseCubicSymmetricCurve(r, n)
		} else if (r.accept('slopes')) {
			return this.parseCubicNonSymmetricCurve(r, n)
		}

		throw new Error(`Unable to determine cubic curve parameters`)
	}

	parseCubicSymmetricCurve(r, n) {
		const cp = this.parseNode(r)
		this.pos = n
		return `S ${cp.x} ${cp.y}, ${n.x} ${n.y}`
	}

	parseCubicNonSymmetricCurve(r, n) {
		const cp1 = this.parseNode(r)
		r.expect('and')
		const cp2 = this.parseNode(r)
		this.pos = n
		return `C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${n.x} ${n.y}`
	}

	parseNode(r) {
		if (r.accept('start')) {
			return this.start
		}

		if (r.accept('center')) {
			return this.center
		}

		return NodeParser.parse(r.read())
	}
}
