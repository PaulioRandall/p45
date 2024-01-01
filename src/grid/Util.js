export default Object.freeze({
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
})
