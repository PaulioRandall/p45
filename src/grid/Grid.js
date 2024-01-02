import Util from './Util.js'
import SpacedGrid from './SpacedGrid.js'

export default class Grid {
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
			Grid.UNIT, //
			{
				x: -size, //
				y: -size, //
			}
		)

		this.UNIT = Grid.UNIT
		this.HALF = Grid.HALF

		this.centerNode = this.node(this._sg.centerXY)

		Object.freeze(this)
	}

	idOf() {
		return Grid.idOf(...arguments)
	}

	contains(x = 0, y = 0) {
		return this._sg.contains(x, y)
	}

	node(x, y, offX = 0, offY = 0) {
		const n = this._sg.node(x, y, offX, offY)

		n.id = Grid.idOf(n.xy.x, n.xy.y, n.off.x, n.off.y)
		n.grid = this

		return n
	}

	n() {
		return this.node(...arguments)
	}
}
