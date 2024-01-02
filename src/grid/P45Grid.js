import Util from './Util.js'
import SpacedGrid from './SpacedGrid.js'

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
		this._sg = new SpacedGrid(
			size * 3, //
			P45Grid.UNIT, //
			{
				x: -size, //
				y: -size, //
			}
		)

		this.UNIT = P45Grid.UNIT
		this.HALF = P45Grid.HALF

		this.lastIdx = this._sg.lastIdx
		this.centerIdx = this._sg.centerIdx
		this.origin = this._sg.origin
		this.len = this._sg.len
		this.centerXY = this._sg.centerXY
		this.bounds = this._sg.bounds
		this.spacing = this._sg.spacing
		this.centerNode = this.node(this.centerXY)
		this.center = this.centerNode

		Object.freeze(this)
	}

	idOf() {
		return P45Grid.idOf(...arguments)
	}

	contains(x = 0, y = 0) {
		return this._sg.contains(x, y)
	}

	node(x, y, offX = 0, offY = 0) {
		const n = this._sg.node(x, y, offX, offY)

		n.id = P45Grid.idOf(n.xy.x, n.xy.y, n.off.x, n.off.y)
		n.grid = this

		return n
	}

	n() {
		return this.node(...arguments)
	}
}