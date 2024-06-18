export default class NodeParser {
	static parse(node) {
		const n = splitNode(node)

		if (!n) {
			throw new Error(`Invalid node '${node}'`)
		}

		parseX(n, 'x')
		parseY(n, 'y')

		return n
	}

	static nodeOf(x, y) {
		return numberToAlpha(x) + y
	}

	static numberToAlpha(n) {
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
}

const splitNode = (node) => {
	node = node.trim()
	let m = null

	m = /^([A-Z]+)([0-9]+)$/.exec(node)
	if (m) {
		return {
			x: m[1],
			y: m[2],
		}
	}

	return null
}

const parseX = (node, k) => {
	if (!node[k]) {
		return
	}

	const v = node[k]
	const len = v.length
	let x = 0

	for (let i = len - 1; i >= 0; i--) {
		const j = len - 1 - i
		const charCode = v.charCodeAt(i)
		const n = charCodeToNumber(charCode)

		if (j === 0) {
			x += n
		} else {
			x += (n + 1) * Math.pow(26, j)
		}
	}

	node[k] = x
}

const charCodeToNumber = (charCode) => {
	const n = charCode - 65

	if (n < 0 || n > 26) {
		throw new Error(`Not a valid coordinate char '${char}'`)
	}

	return n
}

const parseY = (node, k) => {
	if (!node[k]) {
		return
	}

	const n = Number(node[k])
	if (isNaN(n)) {
		throw new Error(`Not a valid Y coordinate '${y}'`)
	}
	node[k] = n
}
