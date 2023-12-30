export default class Grid {
	static get UNIT() {
		return 4
	}

	static get HALF() {
		return 2
	}

	static idOf(col, row, offX = 0, offY = 0, shadow = false) {
		const fmt = (n) => {
			const sign = n < 0 ? '-' : '+'
			return sign + Math.abs(n).toString().padStart(3, '0')
		}

		return `COL_${fmt(col)}_${fmt(offX)}_ROW_${fmt(row)}_${fmt(offY)}`
	}

	static lenPxOf(n) {
		n = Grid.parseN(n)
		return n ? n * Grid.UNIT : n
	}

	static parseXY(x, y) {
		const xy = {
			x: Grid.parseN(x),
			y: Grid.parseN(y),
		}

		if (isNaN(xy.x) || isNaN(xy.y)) {
			return null
		}

		return xy
	}

	static parseN(n) {
		if (typeof n === 'number') {
			return n
		}

		if (typeof n === 'string') {
			return Number(n)
		}

		return NaN
	}

	static checkLen(len) {
		if (len % 2 === 0) {
			return `Requires odd numbered grid length`
		}

		if (len < 3) {
			return `Requires grid length >= 3`
		}

		if (len > 99) {
			return `Requires grid length <= 99`
		}

		return null
	}

	constructor(len = 17) {
		const e = Grid.checkLen(len)
		if (e != null) {
			throw new Error(`[P45:Grid:constructor] ${e}`)
		}

		this.UNIT = Grid.UNIT
		this.HALF = Grid.HALF

		this.len = len
		this.lastIdx = len - 1
		this.centerIdx = this.lastIdx / 2
		this.boundsIdx = Object.freeze({
			xMin: 0,
			xMax: this.lastIdx,
			yMin: 0,
			yMax: this.lastIdx,
		})

		this.lenPx = Grid.UNIT * this.lastIdx
		this.centerPx = Grid.HALF * this.lastIdx
		this.boundsPx = Object.freeze({
			xMin: 0,
			xMax: this.lenPx,
			yMin: 0,
			yMax: this.lenPx,
		})

		this.center = Object.freeze(this.n(this.centerIdx, this.centerIdx))

		Object.freeze(this)
	}

	node(col, row, offX = 0, offY = 0) {
		return this._node(col, row, offX, offY)
	}

	shadowNode(col, row, offX = 0, offY = 0) {
		return this._node(col - this.lastIdx, row - this.lastIdx, offX, offY)
	}

	n() {
		return this.node(...arguments)
	}

	sn() {
		return this.shadowNode(...arguments)
	}

	idOf() {
		return Grid.idOf(...arguments)
	}

	lenPxOf() {
		return Grid.lenPxOf(...arguments)
	}

	parseXY() {
		return Grid.parseXY(...arguments)
	}

	parseN() {
		return Grid.parseN(...arguments)
	}

	checkLen() {
		return Grid.checkLen(...arguments)
	}

	_node(col, row, offX, offY) {
		const colRow = Grid.parseXY(col, row)
		const off = Grid.parseXY(offX, offY)

		if (colRow === null || off === null) {
			return null
		}

		return {
			id: Grid.idOf(col, row, off.x, off.y),
			col: colRow.x,
			row: colRow.y,
			x: colRow.x * Grid.UNIT + off.x,
			y: colRow.y * Grid.UNIT + off.y,
			offX: off.x,
			offY: off.y,
			grid: this,
		}
	}
}
