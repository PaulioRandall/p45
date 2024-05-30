export const SIZES = [8, 12, 16, 20, 24, 32, 48, 64]

export default class Grid {
	constructor(size = 24) {
		if (!SIZES.includes(size)) {
			throw this._newError('', `Invalid size '${size}' choose from: ${SIZES}`)
		}

		this._size = size
	}

	get size() {
		return this._size
	}

	parse(node) {
		const m = this.splitNode(node)

		if (!m) {
			throw this._newError('parse', `Invalid node '${node}'`)
		}

		return {
			x: this.transformX(m[1]),
			y: this.transformY(m[2]),
		}
	}

	parseCSV(nodes) {
		return nodes //
			.split(',')
			.map((n) => n.trim())
			.map((n) => this.parse(n))
	}

	splitNode(node) {
		return /^([A-Z]+)([0-9]+)$/.exec(node.trim())
	}

	transformX(str) {
		let x = 0

		for (let i = str.length - 1; i >= 0; i--) {
			const j = str.length - 1 - i
			const charCode = str.charCodeAt(i)
			const n = this.charCodeToNumber(charCode)

			if (j === 0) {
				x += n
			} else {
				x += (n + 1) * Math.pow(26, j)
			}
		}

		return x
	}

	transformY(y) {
		const n = Number(y)
		if (isNaN(n)) {
			throw this._newError('transformY', `Not a valid Y coordinate '${y}'`)
		}
		return n
	}

	charCodeToNumber(charCode) {
		const n = charCode - 65

		if (n < 0 || n > 26) {
			throw this._newError(
				'letterToNumber',
				`Not a valid coordinate char '${char}'`
			)
		}

		return n
	}

	_newError(func, msg) {
		if (func) {
			func = '.' + func
		}
		return new Error(`[P45:Grid${func}] ${msg}`)
	}
}
