const Util = Object.freeze({
	// parseNumber parses n into a number if it can, else it returns NaN.
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

		xy.x = Util.parseNumber(xy.x)
		xy.y = Util.parseNumber(xy.y)

		if (isNaN(xy.x)) {
			return respond(null, `failed to parse x to a number: ${xy.x}`)
		}

		if (isNaN(xy.x)) {
			return respond(null, `failed to parse y to a number: ${xy.y}`)
		}

		return respond(xy, null)
	},

	// contains returns true if the node identified by x and y is contained
	// within the bounds.
	contains(bounds, x, y) {
		return (
			x >= bounds.xMin && //
			x <= bounds.xMax && //
			y >= bounds.yMin && //
			y <= bounds.yMax
		)
	},
})

export default Util
