export default class TokenReader {
	constructor(cmd) {
		this.cmd = cmd
		this.idx = 0
	}

	print() {
		console.log(this.idx + ': ' + this.cmd[this.idx])
	}

	back(n = 0) {
		this.idx += n
	}

	empty() {
		return this.idx >= this.cmd.length
	}

	read() {
		const tk = this.get()
		this.idx++
		return tk
	}

	get() {
		if (this.empty()) {
			throw new Error(`No more tokens! Token list length: ${this.cmd.length}`)
		}

		return this.cmd[this.idx]
	}

	getLower() {
		return this.get().toLowerCase()
	}

	is(...options) {
		if (this.empty()) {
			return false
		}

		const token = this.getLower()

		for (const o of options) {
			if (token === o) {
				return true
			}
		}

		return false
	}

	accept(...options) {
		if (this.is(...options)) {
			this.idx++
			return true
		}
		return false
	}

	expect(...options) {
		if (this.is(...options)) {
			return this.read()
		}

		throw new Error(
			`At token index ${this.idx}, expected one of '${options}' but got '${this.get()}'`
		)
	}

	expectNumber() {
		const numberPattern = /^[\-\+]?[0-9]+(\.[0-9]+)?$/
		const tk = this.get()

		if (numberPattern.test(tk)) {
			return this.read()
		}

		throw new Error(
			`At token index ${this.idx}, expected number but got '${tk}'`
		)
	}
}
