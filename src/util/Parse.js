import P45Grid from '../grid/P45Grid.js'

export const toNumber = (ref, n) => {
	switch (typeof n) {
		case 'number':
			return n
		case 'string':
			return Number(n)
		case 'boolean':
			return n ? 1 : 0
		default:
			log(ref, `Unable to convert value to a number:`, n)
			return null
	}
}

export const isObject = (obj) => {
	return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

const parseNumber = (ref, propRef, n, alt, { min = null, max = null }) => {
	const logFmt = (msg) => log(ref, `${msg}, defaulting to ${alt}`)
	n = toNumber(ref, n)

	if (n === null) {
		return alt
	}

	if (min !== null && n < min) {
		logFmt(`Requires ${propRef} be a number equal to or greater than ${min}`)
		return alt
	}

	if (max !== null && n > max) {
		logFmt(ref, `Requires ${propRef} be a number equal to or less than ${max}`)
		return alt
	}

	return n
}

const parseNode = (
	ref,
	propRef,
	xy,
	alt,
	{ xMin = null, xMax = null, yMin = null, yMax = null }
) => {
	const project = (n) => (n ? n * P45Grid.UNIT : null)

	return parseXY(ref, propRef, xy, alt, {
		xMin: project(xMin),
		xMax: project(xMax),
		yMin: project(yMin),
		yMax: project(yMax),
	})
}

const parseXY = (
	ref,
	propRef,
	xy,
	alt,
	{ xMin = null, xMax = null, yMin = null, yMax = null }
) => {
	const logFmt = (msg) => log(ref, `${msg}, defaulting to ${alt}`)

	if (!isObject(xy)) {
		logFmt(`Unable to convert value to an object: ${xy}`)
		return alt
	}

	const result = structuredClone(xy)
	result.x = parseNumber(ref, propRef + '.x', xy.x, alt.x, { xMin, xMax })
	result.y = parseNumber(ref, propRef + '.y', xy.y, alt.y, { yMin, yMax })

	return result
}

const log = (ref, ...msg) => {
	console.warn(`[P45:${ref}]`, ...msg)
}

export const Parse = Object.freeze({
	number: parseNumber,
	node: parseNode,
	xy: parseXY,
})
