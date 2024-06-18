import CmdParser from './private/CmdParser.js'
import CmdScanner from './private/CmdScanner.js'
import NodeParser from './private/NodeParser.js'

export const SIZES = [8, 12, 16, 20, 24, 32, 48, 64]

export default class Grid {
	constructor(size = 24) {
		if (!SIZES.includes(size)) {
			throw this._newError('', `Invalid size '${size}' choose from: ${SIZES}`)
		}

		this._size = size
		this._center = size / 2
		this._centerNode = NodeParser.nodeOf(this._center, this._center)
	}

	get size() {
		return this._size
	}

	get center() {
		return this._center
	}

	get centerNode() {
		return this._centerNode
	}

	parseNode(node) {
		return NodeParser.parse(node)
	}

	parseCommands(cmds) {
		const cs = new CmdScanner(cmds)
		const cp = new CmdParser(this.size)
		const result = []

		while (!cs.empty()) {
			const cmd = cs.next()
			result.push(cp.parse(cmd))
		}

		return result.join('\n')
	}
}
