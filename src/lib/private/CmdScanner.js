export default class CmdScanner {
	constructor(cmds) {
		this.cmds = scanAll(cmds)
		this.idx = 0
		this.len = this.cmds.length
	}

	empty() {
		return this.idx >= this.cmds.length
	}

	next() {
		if (this.empty()) {
			throw new Error('Scanner is empty.')
		}

		const cmd = this.cmds[this.idx]
		this.idx++
		return cmd
	}
}

const scanAll = (cmds) => {
	if (!isValidType(cmds)) {
		throw new Error(`Expected array or string but got ${typeof cmds}`)
	}

	cmds = normaliseToArray(cmds)
	checkType(cmds)

	cmds = splitCmdsIntoTokens(cmds)
	return cmds
}

const isValidType = (cmds) => {
	return Array.isArray(cmds) || typeof cmds === 'string'
}

const normaliseToArray = (cmds) => {
	if (typeof cmds === 'string') {
		cmds = cmds.split('\n')
	}
	return cmds
}

const checkType = (cmds) => {
	for (const cmd of cmds) {
		if (typeof cmd !== 'string') {
			throw new Error(
				`Expected array of strings but got item of type ${typeof cmd}`
			)
		}
	}
}

const splitCmdsIntoTokens = (cmds) => {
	return cmds //
		.map(splitCmdIntoTokens)
		.filter((cmd) => cmd.length > 0)
}

const splitCmdIntoTokens = (s) => {
	return s //
		.split(/\s/)
		.map((s) => s.trim())
		.filter((s) => !!s)
}
