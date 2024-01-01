// FreeGrid represents a grid with a fixed size, spacing (pixel distance
// between nodes), and origin offset.
//
// You can also view a grid as a square graph of nodes as the grid does not
// busy itself with cells.
//
// Grids are usually built with an origin in the top left, bottom left, or
// center. FreeGrids have their origin in the top left but can be offset such
// that the passed coordinates are translated internally rather than the user
// having to translate the inputs and outputs.
//
// This makes FreeGrids a nice tool for embedding in larger grids. Think of a
// relatively placed set of vectors that can are translated together.
//
// FreeGrid instances are immutable.
export default class FreeGrid {
	// checkArgs returns a string error message if any argument cannot be used
	// to construct a FreeGrid.
	static checkArgs(size, spacing, origin) {
		return (
			FreeGrid.checkSize(size) || //
			FreeGrid.checkSpacing(spacing) || //
			FreeGrid.checkOrigin(origin)
		)
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

		return null
	}

	// checkSpacing returns a string error message if the spacing argument cannot
	// be used to construct a FreeGrid.
	static checkSpacing(spacing) {
		if (spacing % 2 !== 0) {
			return `Requires even numbered grid spacing`
		}

		if (spacing < 2) {
			return `Requires grid spacing >= 3`
		}

		return null
	}

	// checkOrigin returns a string error message if the origin argument cannot
	// be used to construct a FreeGrid.
	static checkOrigin(origin) {
		if (!origin || typeof origin !== 'object') {
			return `Requires grid origin be an object`
		}

		const x = FreeGrid.parseNumber(origin.x)
		if (isNaN(x)) {
			return `Requires grid origin.x be a number or parsable number`
		}

		const y = FreeGrid.parseNumber(origin.y)
		if (isNaN(y)) {
			return `Requires grid origin.y be a number or parsable number`
		}

		return null
	}

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

	constructor(size, spacing = 2, origin = { x: 0, y: 0 }) {
		const e = FreeGrid.checkArgs(size, spacing, { ...origin })
		if (e !== null) {
			throw new Error(`[P45:FreeGrid:constructor] ${e}`)
		}

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

	parseNumber() {
		return FreeGrid.parseNumber(...arguments)
	}

	// contains returns true if the node identified by x and y is contained
	// within the grid.
	contains(x, y) {
		// TODO
	}

	// node returns a node object containing properties relevant to the node
	// identified by x and y.
	//
	// offX and offY are optional pixel offsets applied relative to the node.
	node(x = 0, y = 0, offX = 0, offY = 0) {
		// TODO
	}

	// nodeXY returns a node object containing properties relevant to the node
	// identified by xy.
	//
	// off contains optional pixel offsets applied relative to the node.
	nodeXY(xy = { x: 0, y: 0 }, off = { x: 0, y: 0 }) {
		return this.node(xy.x, xy.y, off.x, off.y)
	}

	// n is shorthand alias for the node function.
	n() {
		return this.node(...arguments)
	}

	// nXY is shorthand alias for the nodeXY function.
	nXY() {
		return this.node(...arguments)
	}
}
