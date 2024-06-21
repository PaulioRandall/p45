import CmdScanner from './private/CmdScanner.js'
import DrawCmdParser from './private/DrawCmdParser.js'
import TransformCmdParser from './private/TransformCmdParser.js'
import Grid from './private/Grid.js'

export default class P45 extends Grid {
	constructor(size) {
		super(size)
	}

	parseDrawCommands(cmds) {
		const parser = new DrawCmdParser(this)
		return this._parse(cmds, parser)
	}

	parseTransformCommands(cmds) {
		const parser = new TransformCmdParser(this)
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
