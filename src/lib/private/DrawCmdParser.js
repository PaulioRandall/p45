import TokenReader from './TokenReader.js'

export default class DrawCmdParser {
	constructor(grid) {
		this.grid = grid
		this.start = { x: 0, y: 0 }
		this.pos = { x: 0, y: 0 }
	}

	parse(cmd) {
		const r = new TokenReader(cmd)

		if (r.is('move')) {
			return this.parseMove(r)
		}

		if (r.is('close')) {
			return this.parseClose(r)
		}

		if (r.is('line')) {
			return this.parseDrawLine(r)
		}

		if (r.is('quadratic') || r.is('quad') || r.is('q')) {
			return this.parseQuadraticCurve(r)
		}

		if (r.is('cubic') || r.is('curve')) {
			return this.parseCubicCurve(r)
		}

		if (r.is('arc')) {
			return this.parseArc(r)
		}

		return []
	}

	parseMove(r) {
		r.expect('move')
		r.expect('to')

		const to = this.parseNode(r)
		this.start = to
		return `M ${to.x} ${to.y}`
	}

	parseClose(r) {
		r.expect('close')
		r.accept('path')

		this.pos = this.start
		return `Z`
	}

	parseDrawLine(r) {
		r.expect('line')
		r.expect('to')

		const to = this.parseNode(r)
		this.pos = to
		return `L ${to.x} ${to.y}`
	}

	parseQuadraticCurve(r) {
		r.expect('q', 'quad', 'quadratic')
		r.expect('curve')
		r.expect('to')

		const to = this.parseNode(r)

		if (r.empty()) {
			this.pos = to
			return `T ${to.x} ${to.y}`
		}

		r.expect('with')
		r.expect('slope')

		const cp = this.parseNode(r)
		this.pos = to
		return `Q ${cp.x} ${cp.y}, ${to.x} ${to.y}`
	}

	parseCubicCurve(r) {
		r.accept('cubic')
		r.expect('curve')
		r.expect('to')

		const to = this.parseNode(r)

		r.expect('with')

		if (r.accept('slope')) {
			return this.parseCubicSymmetricCurve(r, to)
		} else if (r.accept('slopes')) {
			return this.parseCubicNonSymmetricCurve(r, to)
		}

		throw new Error(`Unable to determine cubic curve parameters`)
	}

	parseCubicSymmetricCurve(r, to) {
		const cp = this.parseNode(r)
		this.pos = to
		return `S ${cp.x} ${cp.y}, ${to.x} ${to.y}`
	}

	parseCubicNonSymmetricCurve(r, to) {
		const cp1 = this.parseNode(r)
		r.expect('and')
		const cp2 = this.parseNode(r)
		this.pos = to
		return `C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${to.x} ${to.y}`
	}

	parseArc(r) {
		// [rx, ry, ro, large, sweep, x, y]
		const params = [0, 0, 0, 0, 0, 0, 0]

		r.expect('arc')
		r.expect('to')
		const to = this.parseNode(r)
		params[5] = to.x
		params[6] = to.y

		r.expect('with')
		r.expect('x')
		r.expect('radius')
		params[0] = r.expectNumber()

		r.expect('with')
		r.expect('y')
		r.expect('radius')
		params[1] = r.expectNumber()

		this.parseOptionllyArcParams(r, params)

		this.pos = to
		return `A ${params.join(' ')}`
	}

	parseOptionllyArcParams(r, params) {
		while (!r.empty()) {
			if (r.accept('with')) {
				r.expect('rotation')
				params[2] = r.expectNumber()
				continue
			}

			r.expect('and')
			r.expect('is')

			if (r.accept('large')) {
				params[3] = 1
			} else {
				r.expect('sweeping')
				params[4] = 1
			}
		}
	}

	parseNode(r) {
		if (r.accept('start')) {
			return this.start
		}

		return this.grid.parseNode(r.read())
	}
}
