import P45SpacedGrid from './P45SpacedGrid.js'

export default class P45Grid {
	static get UNIT() {
		return 4
	}

	static get HALF() {
		return 2
	}

	static idOf(col, row, offX = 0, offY = 0) {
		const fmt = (n) => {
			const sign = n < 0 ? '-' : '+'
			return sign + Math.abs(n).toString().padStart(3, '0')
		}

		return `COL_${fmt(col)}_${fmt(offX)}_ROW_${fmt(row)}_${fmt(offY)}`
	}

	constructor(size = 17) {
		this._sg = new P45SpacedGrid(
			size, //
			P45Grid.UNIT //
		)

		this.UNIT = P45Grid.UNIT
		this.HALF = P45Grid.HALF

		this.lastIdx = this._sg.lastIdx
		this.centerIdx = this._sg.centerIdx
		this.centerXY = this._sg.centerXY
		this.bounds = this._sg.bounds
		this.boundsPx = this._sg.boundsPx

		this.len = this._sg.len
		this.lenPx = (this.len - 1) * P45Grid.UNIT

		this.center = this.node(this.centerXY)

		Object.freeze(this)
	}

	idOf() {
		return P45Grid.idOf(...arguments)
	}

	contains(x = 0, y = 0) {
		return this._sg.contains(x, y)
	}

	containsPx(x = 0, y = 0) {
		return this._sg.containsPx(x, y)
	}

	node(x, y, offX = 0, offY = 0) {
		const n = this._sg.node(x, y, offX, offY)

		n.id = P45Grid.idOf(n.coords.x, n.coords.y, n.off.x, n.off.y)

		return n
	}

	n() {
		return this.node(...arguments)
	}
}
