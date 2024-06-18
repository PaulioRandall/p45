import CmdScanner from './private/CmdScanner.js'
import DrawCmdParser from './private/DrawCmdParser.js'
import TransformCmdParser from './private/TransformCmdParser.js'
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

	parseDrawCommands(cmds) {
		const parser = new DrawCmdParser(this.size)
		return this._parse(cmds, parser)
	}

	parseTransformCommands(cmds) {
		const parser = new TransformCmdParser(this.size)
		return this._parse(cmds, parser)
	}

	_parse(cmds, parser) {
		const scanner = new CmdScanner(cmds)
		const result = []

		while (!scanner.empty()) {
			const cmd = scanner.next()
			result.push(parser.parse(cmd))
		}

		return result.join('\n')
	}
}
