const P45Util = Object.freeze({
	// roundTo rounds n to dp number of decimal places.
	roundTo(n, dp = 3) {
		const mod = Math.pow(10, dp)
		return Math.round(n * mod) / mod
	},

	// parseNumber parses n into a number if it can, else it returns NaN.
	//
	// Unlike Number(n) no exception is thrown. NaN is always returned if
	// parsing fails.
	parseNumber(n) {
		if (typeof n === 'number') {
			return n
		}

		if (typeof n === 'string') {
			return Number(n)
		}

		return NaN
	},

	// parseXY returns a result object containing a possible err string prop,
	// an xy prop in the form { x, y } where both x and y are numbers, and a
	// wasObject flag indicating the passed x value was an object containing the
	// real x and y values.
	//
	// The input may either be two parsable numbers (x and y respectivily) or an
	// object containing parsable x and y props.
	parseXY(x, y) {
		let wasObject = false

		const respond = (xy, err) => ({ xy, err, wasObject })
		let xy = x

		if (!xy || typeof xy !== 'object') {
			xy = { x, y }
		} else {
			wasObject = true
			xy = { ...xy }
		}

		xy.x = P45Util.parseNumber(xy.x)
		xy.y = P45Util.parseNumber(xy.y)

		if (isNaN(xy.x)) {
			return respond(xy, `failed to parse x to a number: ${xy.x}`)
		}

		if (isNaN(xy.x)) {
			return respond(xy, `failed to parse y to a number: ${xy.y}`)
		}

		return respond(xy, null)
	},

	// checkXY returns a string error message if the xy object argument does not
	// satisfy the { x: Number, y: Number }. Else returns null.
	checkXY(xy, ref = 'xy') {
		if (!xy || typeof xy !== 'object') {
			return `must be an object`
		}

		const x = P45Util.parseNumber(xy.x)
		if (isNaN(x)) {
			return `${ref}.x must be a number or parsable number`
		}

		const y = P45Util.parseNumber(xy.y)
		if (isNaN(y)) {
			return `${ref}.y must be a number or parsable number`
		}

		return null
	},

	// within returns true if the number n is contained within the bounds.
	within(n, min, max) {
		return n >= min && n <= max
	},

	// contains returns true if the x and y are contained within the bounds.
	//
	// bounds = {
	//   xMin,
	//   xMax,
	//   yMin,
	//   yMax,
	// }
	contains(x, y, bounds) {
		return (
			x >= bounds.xMin && //
			x <= bounds.xMax && //
			y >= bounds.yMin && //
			y <= bounds.yMax
		)
	},

	nodeGenerator(grid) {
		const nodes = {}

		for (let i = 0; i < grid.len; i++) {
			for (let j = 0; j < grid.len; j++) {
				const name = this._indexToAlpha(i) + j
				nodes[name] = grid.n(i, j)
			}
		}

		return nodes
	},

	_indexToAlpha(i) {
		const n = Math.floor(i / 26)

		if (n === 0) {
			return this._numberToAlpha(i)
		}

		return this._indexToAlpha(n - 1) + this._numberToAlpha(i % 26)
	},

	_numberToAlpha(n) {
		const ASCII_CAPITAL_LETTER_OFFSET = 65
		return String.fromCharCode(n + ASCII_CAPITAL_LETTER_OFFSET)
	},
})

export default P45Util
