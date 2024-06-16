export default class ShapeState {
	constructor(svgWidth = 0, svgHeight = 0) {
		this._start = { x: 0, y: 0 }
		this._pos = { x: 0, y: 0 }
		this._svgSize = { w: svgWidth, h: svgHeight }
		this._svgCenter = { x: svgWidth / 2, y: svgHeight / 2 }
	}

	getStart() {
		return this._start
	}

	setStart(n) {
		this._start = structuredClone(n)
		this._pos = structuredClone(n)
		return this
	}

	getPos() {
		return this._pos
	}

	setPos(n) {
		this._pos = structuredClone(n)
		return this
	}

	getCenter() {
		return this._svgCenter
	}
}
