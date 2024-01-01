import Util from './Util.js'

// checkArgs returns a string error message if any argument cannot be used
// to construct a OffsetGrid.
export const checkArgs = (size, origin) => {
	return (
		checkSize(size) || //
		checkOrigin(origin)
	)
}

// checkSize returns a string error message if the size argument cannot be
// used to construct a OffsetGrid.
export const checkSize = (size) => {
	if (size % 2 === 0) {
		return `Requires odd numbered grid size`
	}

	if (size < 3) {
		return `Requires grid size >= 3`
	}

	return null
}

// checkOrigin returns a string error message if the origin argument cannot
// be used to construct a OffsetGrid.
export const checkOrigin = (origin) => {
	if (!origin || typeof origin !== 'object') {
		return `Requires grid origin be an object`
	}

	const x = Util.parseNumber(origin.x)
	if (isNaN(x)) {
		return `Requires grid origin.x be a number or parsable number`
	}

	const y = Util.parseNumber(origin.y)
	if (isNaN(y)) {
		return `Requires grid origin.y be a number or parsable number`
	}

	return null
}

// OffsetGrid represents a grid with a fixed size and origin offset.
//
// You can view the grid as a square graph of nodes as the grid does not busy
// itself with cells.
export default (size, origin) => {
	origin = structuredClone(origin)

	const e = checkArgs(size, origin)
	if (e !== null) {
		throw new Error(`[P45:OffsetGrid] ${e}`)
	}

	const grid = {}

	grid.lastIdx = size - 1
	grid.centerIdx = grid.lastIdx / 2

	grid.origin = Object.freeze({
		x: origin?.x || 0, //
		y: origin?.y || 0, //
	})

	grid.len = size

	grid.center = Object.freeze({
		x: grid.origin.x + grid.centerIdx, //
		y: grid.origin.y + grid.centerIdx, //
	})

	grid.bounds = Object.freeze({
		xMin: grid.origin.x, //
		xMax: grid.origin.x + grid.lastIdx, //
		yMin: grid.origin.y, //
		yMax: grid.origin.y + grid.lastIdx, //
	})

	return Object.freeze(grid)
}
