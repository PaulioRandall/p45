const scan = (cmds) => {
	if (!isValidType(cmds)) {
		return [
			//
			null,
			`Expected array or string but got ${typeof cmds}`,
		]
	}

	cmds = normaliseToArray(cmds)

	const err = checkType(cmds)
	if (err) {
		return [null, err]
	}

	cmds = splitCmdsIntoTokens(cmds)
	return [cmds, null]
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
			return `Expected array of strings but got item of type ${typeof cmd}`
		}
	}
	return null
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

export default scan
