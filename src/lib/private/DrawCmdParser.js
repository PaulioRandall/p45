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

		if (r.is('quadratic') || r.is('quad')) {
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
		r.expectSequence('move', 'to')

		const to = this.parseNode(r)
		this.start = to
		return `M ${to.x} ${to.y}`
	}

	parseClose(r) {
		r.expect('close')

		this.pos = this.start
		return `Z`
	}

	parseDrawLine(r) {
		r.expectSequence('line', 'to')

		const to = this.parseNode(r)
		return this.compilePath('L', to)
	}

	parseQuadraticCurve(r) {
		r.expect('quad', 'quadratic')
		r.expectSequence('curve', 'to')

		const to = this.parseNode(r)

		if (r.empty()) {
			return this.compilePath('T', to)
		}

		r.expect('control')
		r.expect('with')

		const cp = this.parseNode(r)
		return this.compilePath('Q', cp, to)
	}

	parseCubicCurve(r) {
		r.accept('cubic')
		r.expectSequence('curve', 'to')

		const to = this.parseNode(r)

		r.expectSequence('control', 'with')

		let cpIn = null
		let cpOut = this.parseNode(r)

		if (r.accept('and')) {
			cpIn = cpOut
			cpOut = this.parseNode(r)
		}

		if (cpIn === null) {
			return this.compilePath('S', cpOut, to)
		}

		return this.compilePath('C', cpIn, cpOut, to)
	}

	parseArc(r) {
		// [rx, ry, ro, large, sweep, x, y]
		const params = [0, 0, 0, 0, 0, 0, 0]

		r.expectSequence('arc', 'to')
		const to = this.parseNode(r)
		params[5] = to.x
		params[6] = to.y

		r.expectSequence('with', 'radius')
		params[0] = r.expectNumber()

		r.expect('and')
		params[1] = r.expectNumber()

		this.parseOptionllyArcParams(r, params)

		this.pos = to
		return `A ${params.join(' ')}`
	}

	parseOptionllyArcParams(r, params) {
		while (!r.empty()) {
			r.expect('and')

			if (r.accept('rotation')) {
				params[2] = r.expectNumber()
				continue
			}

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

	compilePath(letter, ...coords) {
		const lastIdx = coords.length - 1
		this.pos = coords[lastIdx]

		const coordStr = coords.map((c) => `${c.x} ${c.y}`)
		return `${letter} ${coordStr.join(', ')}`
	}
}
