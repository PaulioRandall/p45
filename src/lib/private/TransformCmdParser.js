import TokenReader from './TokenReader.js'
import NodeParser from './NodeParser.js'

export default class TransformCmdParser {
	constructor(gridSize = 0) {
		this.size = { w: gridSize, h: gridSize }
		this.center = { x: gridSize / 2, y: gridSize / 2 }
	}

	parse(cmd) {
		const r = new TokenReader(cmd)

		if (r.is('move')) {
			return this.parseMove(r)
		}

		if (r.is('rotate')) {
			return this.parseRotate(r)
		}

		if (r.is('scale')) {
			return this.parseScale(r)
		}

		if (r.is('flip')) {
			return this.parseFlip(r)
		}

		if (r.is('skew')) {
			return this.parseSkew(r)
		}

		throw new Error(`Unknown command '${r.get()}'`)
	}

	parseMove(r) {
		r.expect('move')
		const direction = r.expect('up', 'down', 'left', 'right')

		r.expect('by')
		const amount = r.expectNumber()

		switch (direction) {
			case 'up':
				return `translate(0, ${-amount})`
			case 'down':
				return `translate(0, ${amount})`
			case 'left':
				return `translate(${-amount}, 0)`
			case 'right':
				return `translate(${amount}, 0)`
		}
	}

	parseRotate(r) {
		r.expect('rotate')
		r.expect('by')

		const amount = r.expectNumber()

		if (!r.accept('around')) {
			return `rotate(${amount})`
		}

		const n = this.parseNode(r)
		return `rotate(${amount}, ${n.x}, ${n.y})`
	}

	parseScale(r) {
		r.expect('scale')
		const axis = this.parseAxis(r)

		r.expect('by')
		const amount = r.expectNumber()

		switch (axis) {
			case null:
				return `scale(${amount}, ${amount})`
			case 'x':
				return `scale(${amount}, 1)`
			case 'y':
				return `scale(1, ${amount})`
		}
	}

	parseFlip(r) {
		r.expect('flip')
		const axis = this.parseAxis(r)

		switch (axis) {
			case null:
				return `scale(-1, -1)`
			case 'x':
				return `scale(-1, 1)`
			case 'y':
				return `scale(1, -1)`
		}
	}

	parseSkew(r) {
		r.expect('skew')
		const axis = this.parseAxis(r)

		r.expect('by')
		const amount = r.expectNumber()

		switch (axis) {
			case null:
				return `skewX(${amount}) skewY(${amount})`
			case 'width':
			case 'x':
				return `skewX(${amount})`
			case 'height':
			case 'y':
				return `skewY(${amount})`
		}
	}

	parseAxis(r) {
		if (r.accept('width', 'x', 'horizontally')) {
			return 'x'
		}

		if (r.accept('height', 'y', 'vertically')) {
			return 'y'
		}

		return null
	}

	parseNode(r) {
		if (r.accept('center')) {
			return this.center
		}

		return NodeParser.parse(r.read())
	}
}
