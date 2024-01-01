import Util from './Util.js'

// OffsetGrid represents a grid with a fixed size and origin offset.
//
// You can view the grid as a square graph of nodes as the grid does not busy
// itself with cells.
export default class OffsetGrid {
	// checkArgs returns a string error message if any argument cannot be used
	// to construct a OffsetGrid.
	static checkArgs(size, origin) {
		return (
			OffsetGrid.checkSize(size) || //
			OffsetGrid.checkOrigin(origin)
		)
	}

	// checkSize returns a string error message if the size argument cannot be
	// used to construct a OffsetGrid.
	static checkSize(size) {
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
	static checkOrigin(origin) {
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

	constructor(size, origin) {
		origin = structuredClone(origin)

		const e = OffsetGrid.checkArgs(size, origin)
		if (e !== null) {
			throw new Error(`[P45:OffsetGrid:constructor] ${e}`)
		}

		this.lastIdx = size - 1
		this.centerIdx = this.lastIdx / 2

		this.origin = {
			x: origin?.x || 0, //
			y: origin?.y || 0, //
		}

		this.len = size

		this.center = {
			x: this.origin.x + this.centerIdx, //
			y: this.origin.y + this.centerIdx, //
		}

		this.bounds = {
			xMin: this.origin.x, //
			xMax: this.origin.x + this.lastIdx, //
			yMin: this.origin.y, //
			yMax: this.origin.y + this.lastIdx, //
		}
	}

	// contains returns true if the node identified by x and y is contained
	// within the grid.
	contains(x, y) {
		return (
			x >= this.bounds.xMin && //
			x <= this.bounds.xMax && //
			y >= this.bounds.yMin && //
			y <= this.bounds.yMax
		)
	}

	// node returns a node object containing properties relevant to the node
	// identified by x and y.
	node(x = 0, y = 0) {
		const { xy, err } = this._parseNodeArgs(x, y)
		if (err !== null) {
			throw new Error(`[P45:OffsetGrid:node] ${err}`)
		}

		if (!this.contains(xy.x, xy.y)) {
			throw new Error(`[P45:OffsetGrid:node] out of bounds: ${xy}`)
		}

		return {
			...xy,
			grid: this,
		}
	}

	n() {
		return this.node(...arguments)
	}

	_parseNodeArgs(x, y) {
		const respond = (xy, err) => ({ xy, err })
		let xy = x

		if (!xy || typeof xy !== 'object') {
			xy = { x, y }
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
	}
}
