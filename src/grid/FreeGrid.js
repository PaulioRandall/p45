// FreeGrid represents a grid with a fixed size, spacing, and origin offset.
//
// Grids are usually built with an origin in the top left, bottom left, or
// center. FreeGrids have their origin in the top left but can be offset such
// that the passed coordinates are translated internally rather than the user
// having to translate the input and output.
//
// This makes FreeGrids a nice tool for embedding in larger grids. Think of a
// relatively placed set of vectors that can are translated together.
//
// FreeGrid instances are immutable.
export default class FreeGrid {
	// parseNumber parses n into a number if it can, else it returns NaN.
	static parseNumber(n) {
		if (typeof n === 'number') {
			return n
		}

		if (typeof n === 'string') {
			return Number(n)
		}

		return NaN
	}

	// checkSize returns a string error message if the size argument cannot be
	// used to construct a FreeGrid.
	static checkSize(size) {
		if (size % 2 === 0) {
			return `Requires odd numbered grid size`
		}

		if (size < 3) {
			return `Requires grid size >= 3`
		}

		if (size > 99) {
			return `Requires grid size <= 99`
		}

		return null
	}

	constructor(size, spacing = 2, origin = { x: 0, y: 0 }) {
		// TODO: Validate input
		// TODO: odd sizes only
		// TODO: even spacings >1 only

		this._lastIdx = size - 1
		this._centerIdx = this._lastIdx / 2

		this.spacing = spacing
		this.origin = {
			x: origin?.x || 0, //
			y: origin?.y || 0, //
		}

		this.lenXY = size
		this.centerXY = {
			x: this.origin.x + this._centerIdx, //
			y: this.origin.y + this._centerIdx, //
		}

		this.boundsXY = {
			xMin: this.origin.x, //
			xMax: this.origin.x + this._lastIdx, //
			yMin: this.origin.y, //
			yMax: this.origin.y + this._lastIdx, //
		}

		const halfSpacing = this.spacing / 2

		this.lenPx = this.spacing * this._lastIdx
		this.centerPx = {
			x: this.centerXY.x * this.spacing, //
			y: this.centerXY.y * this.spacing, //
		}

		this.boundsPx = Object.freeze({
			xMin: this.boundsXY.xMin * this.spacing,
			xMax: this.boundsXY.xMax * this.spacing,
			yMin: this.boundsXY.yMin * this.spacing,
			yMax: this.boundsXY.yMax * this.spacing,
		})

		this.centerNode = Object.freeze(
			this.node(this.midX, this.midY) //
		)

		Object.freeze(this)
	}

	// contains returns true if the node identified by col and row is contained
	// within the grid.
	contains(col, row) {
		// TODO
	}

	// node returns a node object containing properties relevant to the node
	// identified by col and row.
	node(col, row) {
		// TODO
	}

	// n is shorthand alias for the node function.
	n() {
		return this.node(...arguments)
	}
}
