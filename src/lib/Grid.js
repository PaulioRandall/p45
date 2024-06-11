export const SIZES = [8, 12, 16, 20, 24, 32, 48, 64]

export default class Grid {
	constructor(size = 24) {
		if (!SIZES.includes(size)) {
			throw this._newError('', `Invalid size '${size}' choose from: ${SIZES}`)
		}

		this._size = size
		this._center = size / 2
		this._centerNode = this.nodeOf(this._center, this._center)
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

	parse(node) {
		const n = this._splitNode(node)

		if (!n) {
			throw this._newError('parse', `Invalid node '${node}'`)
		}

		this._transformX(n, 'x')
		this._transformY(n, 'y')

		this._transformX(n, 'cp1x')
		this._transformY(n, 'cp1y')

		this._transformX(n, 'cp2x')
		this._transformY(n, 'cp2y')

		return n
	}

	parseCSV(nodes) {
		return nodes //
			.split(',')
			.map((n) => n.trim())
			.map((n) => this.parse(n))
	}

	nodeToSvgPoint({ type, x, y, cp1x, cp1y, cp2x, cp2y }, i) {
		if (i === 0) {
			return `M ${x},${y}`
		}

		if (type === 'N') {
			return `${x},${y}`
		}

		if (type === 'L') {
			return `L ${x},${y}`
		}

		if (type === 'T') {
			return `T ${x},${y}`
		}

		if (type === 'S') {
			return `S ${cp1x},${cp1y} ${x},${y}`
		}

		if (type === 'Q') {
			return `Q ${cp1x},${cp1y} ${x},${y}`
		}

		if (type === 'C') {
			return `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`
		}

		throw this._newError('nodeToSvgPoint', `Unknown point type '${type}'`)
	}

	nodeOf(x, y) {
		return this.numberToAlpha(x) + y
	}

	numberToAlpha(n) {
		const A = 65
		const result = []

		while (n >= 26) {
			let rem = n % 26
			result.unshift(rem + A)
			n -= rem
		}

		result.unshift(n + 65)
		return String.fromCharCode(...result)
	}

	_splitNode(node) {
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

	_transformX(node, k) {
		if (!node[k]) {
			return
		}

		const v = node[k]
		const len = v.length
		let x = 0

		for (let i = len - 1; i >= 0; i--) {
			const j = len - 1 - i
			const charCode = v.charCodeAt(i)
			const n = this._charCodeToNumber(charCode)

			if (j === 0) {
				x += n
			} else {
				x += (n + 1) * Math.pow(26, j)
			}
		}

		node[k] = x
	}

	_transformY(node, k) {
		if (!node[k]) {
			return
		}

		const n = Number(node[k])
		if (isNaN(n)) {
			throw this._newError('transformY', `Not a valid Y coordinate '${y}'`)
		}
		node[k] = n
	}

	_charCodeToNumber(charCode) {
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
