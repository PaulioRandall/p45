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
		const n = this.splitNode(node)

		if (!n) {
			throw this._newError('parse', `Invalid node '${node}'`)
		}

		this.transformX(n, 'x')
		this.transformY(n, 'y')
		this.transformX(n, 'cp1x')
		this.transformY(n, 'cp1y')
		this.transformX(n, 'cp2x')
		this.transformY(n, 'cp2y')

		return n
	}

	parseCSV(nodes) {
		return nodes //
			.split(',')
			.map((n) => n.trim())
			.map((n) => this.parse(n))
	}

	splitNode(node) {
		node = node.trim()
		let m = null

		m = /^([A-Z]+)([0-9]+)(?:\s+([LT]))?$/.exec(node)
		if (m) {
			return {
				x: m[1],
				y: m[2],
				type: m[3] ? m[3] : 'N',
			}
		}

		m = /^([A-Z]+)([0-9]+)\s+([SQ])\s+([A-Z]+)([0-9]+)$/.exec(node)
		if (m) {
			return {
				x: m[1],
				y: m[2],
				type: m[3],
				cp1x: m[4],
				cp1y: m[5],
			}
		}

		m = /^([A-Z]+)([0-9]+)\s+([C])\s+([A-Z]+)([0-9]+)\s+([A-Z]+)([0-9]+)$/.exec(
			node
		)
		if (m) {
			return {
				x: m[1],
				y: m[2],
				type: m[3],
				cp1x: m[4],
				cp1y: m[5],
				cp2x: m[6],
				cp2y: m[7],
			}
		}

		return null
	}

	transformX(node, k) {
		if (!node[k]) {
			return
		}

		const v = node[k]
		const len = v.length
		let x = 0

		for (let i = len - 1; i >= 0; i--) {
			const j = len - 1 - i
			const charCode = v.charCodeAt(i)
			const n = this.charCodeToNumber(charCode)

			if (j === 0) {
				x += n
			} else {
				x += (n + 1) * Math.pow(26, j)
			}
		}

		node[k] = x
	}

	transformY(node, k) {
		if (!node[k]) {
			return
		}

		const n = Number(node[k])
		if (isNaN(n)) {
			throw this._newError('transformY', `Not a valid Y coordinate '${y}'`)
		}
		node[k] = n
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
