export default class Grid {
	constructor(size = 24) {
		if (size < 8) {
			throw new Error(`Size must be 8 or more.`)
		}

		if (size > 64) {
			throw new Error(`Size must be 64 or less.`)
		}

		if (size % 2 !== 0) {
			throw new Error(`Size must be divisible by 2.`)
		}

		this._size = size
		this._center = size / 2

		this._special = {
			'center': Grid.nodeOf(this._center, this._center),

			'top-left': Grid.nodeOf(0, 0),
			'top-center': Grid.nodeOf(this._center, 0),
			'top-right': Grid.nodeOf(this._size, 0),

			'center-left': Grid.nodeOf(0, this._center),
			'center-center': Grid.nodeOf(this._center, this._center),
			'center-right': Grid.nodeOf(this._size, this._center),

			'bottom-left': Grid.nodeOf(0, this._size),
			'bottom-center': Grid.nodeOf(this._center, this._size),
			'bottom-right': Grid.nodeOf(this._size, this._size),
		}
	}

	get size() {
		return this._size
	}

	get center() {
		return this._center
	}

	get centerNode() {
		return this._special['center']
	}

	get topLeftNode() {
		return this._special['top-left']
	}

	get topCenterNode() {
		return this._special['top-center']
	}

	get topRightNode() {
		return this._special['top-right']
	}

	get centerLeftNode() {
		return this._special['center-left']
	}

	get centerCenterNode() {
		return this._special['center-center']
	}

	get centerRightNode() {
		return this._special['center-right']
	}

	get bottomLeftNode() {
		return this._special['bottom-left']
	}

	get bottomCenterNode() {
		return this._special['bottom-center']
	}

	get bottomRightNode() {
		return this._special['bottom-right']
	}

	parseNode(node) {
		const special = this._special[node]

		if (special) {
			return Grid.parseNode(special)
		}

		return Grid.parseNode(node)
	}

	nodeOf(x, y) {
		return Grid.nodeOf(x, y)
	}

	static parseNode(node) {
		const n = splitNode(node)

		if (!n) {
			throw new Error(`Invalid node '${node}'`)
		}

		return {
			x: parseX(n.x, n.xSign),
			y: parseY(n.y, n.ySign),
		}
	}

	static nodeOf(x, y) {
		return numberToAlpha(x) + y
	}
}

const numberToAlpha = (n) => {
	const isNegative = n < 0
	const A = 65
	const result = []

	n = Math.abs(n)

	while (n >= 26) {
		let rem = n % 26
		result.unshift(rem + A)
		n -= rem
	}

	result.unshift(n + 65)
	const alpha = String.fromCharCode(...result)
	return isNegative ? '-' + alpha : alpha
}

const splitNode = (node) => {
	node = node.trim()
	let m = null

	m = /^([\-\+])?([A-Za-z]+)([\-\+])?([0-9]+)$/.exec(node)
	if (m) {
		return {
			xSign: m[1],
			x: m[2],
			ySign: m[3],
			y: m[4],
		}
	}

	return null
}

const parseX = (s, sign) => {
	if (!s) {
		return s
	}

	s = s.toUpperCase()
	const len = s.length
	let x = 0

	for (let i = len - 1; i >= 0; i--) {
		const j = len - 1 - i
		const charCode = s.charCodeAt(i)
		const n = charCodeToNumber(charCode)

		if (j === 0) {
			x += n
		} else {
			x += (n + 1) * Math.pow(26, j)
		}
	}

	return sign === '-' ? -x : x
}

const charCodeToNumber = (charCode) => {
	const n = charCode - 65

	if (n < 0 || n > 26) {
		throw new Error(`Not a valid coordinate char '${char}'`)
	}

	return n
}

const parseY = (s, sign) => {
	if (!s) {
		return s
	}

	const y = Number(s)
	if (isNaN(y)) {
		throw new Error(`Not a valid Y coordinate '${s}'`)
	}

	return sign === '-' ? -y : y
}
