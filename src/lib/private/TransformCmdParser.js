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

	parseNode(r) {
		if (r.accept('center')) {
			return this.center
		}

		return NodeParser.parse(r.read())
	}
}
