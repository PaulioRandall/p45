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
		return `rotate(${amount})`
	}

	parseScale(r) {
		r.expect('scale')
		const axis = r.expect('width', 'x', 'height', 'y')

		r.expect('by')
		const amount = r.expectNumber()

		switch (axis) {
			case 'width':
			case 'x':
				return `scale(${amount}, 1)`
			case 'height':
			case 'y':
				return `scale(1, ${amount})`
		}
	}

	parseNode(r) {
		if (r.accept('center')) {
			return this.center
		}

		return NodeParser.parse(r.read())
	}
}
