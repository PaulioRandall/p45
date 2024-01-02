import Util from './Util.js'

// SpacedGrid represents a grid with a fixed size, spacing (pixel distance
// between nodes), and origin offset.
//
// You can also view a grid as a square graph of nodes as the grid does not
// busy itself with cells.
//
// Grids are usually built with an origin in the top left, bottom left, or
// center. SpacedGrids have their origin in the top left but can be offset such
// that the passed coordinates are translated internally rather than the user
// having to translate the inputs and outputs.
//
// This makes SpacedGrids a nice tool for embedding in larger grids. Think of a
// relatively placed set of vectors that can are translated together.
//
// SpacedGrid instances are immutable.
export default class SpacedGrid {
	// checkArgs returns a string error message if any argument cannot be used
	// to construct a SpacedGrid.
	static checkArgs(size, spacing, origin) {
		return (
			SpacedGrid.checkSize(size) || //
			SpacedGrid.checkSpacing(spacing) || //
			SpacedGrid.checkOrigin(origin)
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

	// checkSpacing returns a string error message if the spacing argument cannot
	// be used to construct a SpacedGrid.
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

	constructor(size, spacing, origin = { x: 0, y: 0 }) {
		const e = SpacedGrid.checkArgs(size, spacing, origin)
		if (e !== null) {
			throw new Error(`[P45:SpacedGrid:constructor] ${e}`)
		}

		this.lastIdx = size - 1
		this.centerIdx = this.lastIdx / 2

		this.origin = Object.freeze({
			x: origin?.x || 0, //
			y: origin?.y || 0, //
		})

		this.len = size

		this.centerXY = Object.freeze({
			x: this.origin.x + this.centerIdx, //
			y: this.origin.y + this.centerIdx, //
		})

		this.bounds = Object.freeze({
			xMin: this.origin.x, //
			xMax: this.origin.x + this.lastIdx, //
			yMax: this.origin.y + this.lastIdx, //
			yMin: this.origin.y, //
		})

		this.spacing = spacing
		this.centerNode = Object.freeze(
			this.node(this.centerXY.x, this.centerXY.y) //
		)

		Object.freeze(this)
	}

	// contains returns true if the node identified by x and y is contained
	// within the grid.
	contains(x, y) {
		return Util.contains(this.bounds, x, y)
	}

	// node returns a node object containing properties relevant to the node
	// identified by x and y.
	//
	// offX and offY are optional pixel offsets applied relative to the node.
	node(x = 0, y = 0, offX = 0, offY = 0) {
		let { xy, err, wasObject } = Util.parseXY(x, y)
		if (err !== null) {
			throw new Error(`[P45:SpacedGrid:node] ${err}`)
		}

		if (!this.contains(xy.x, xy.y)) {
			throw new Error(`[P45:SpacedGrid:node] out of bounds: ${xy}`)
		}

		let off = wasObject ? Util.parseXY(y, offX) : Util.parseXY(offX, offY)
		if (off.err !== null) {
			throw new Error(`[P45:SpacedGrid:node] ${off}`)
		}

		off = off.xy

		return {
			coords: xy,
			off,
			x: xy.x * this.spacing + off.x,
			y: xy.y * this.spacing + off.y,
			grid: this,
		}
	}

	// n is shorthand alias for the node function.
	n() {
		return this.node(...arguments)
	}
}
