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

	get() {
		if (this.empty()) {
			throw new Error(`No more tokens! Token list length: ${this.cmd.length}`)
		}

		return this.cmd[this.idx]
	}

	is(s) {
		return !this.empty() && this.get() === s
	}

	read() {
		const tk = this.get()
		this.idx++
		return tk
	}

	accept(s) {
		if (this.is(s)) {
			this.idx++
			return true
		}
		return false
	}

	expect(s) {
		const token = this.get()

		if (token === s) {
			this.idx++
			return token
		}

		throw new Error(
			`At token index ${this.idx}, expected '${s}' but got '${token}'`
		)
	}
}
