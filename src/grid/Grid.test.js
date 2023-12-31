import Grid from './Grid.js'

describe('Grid.js', () => {
	describe('Grid.constructor(size)', () => {
		test('accepts odd numbered size', () => {
			new Grid(3)
		})

		test('throws if even numbered size', () => {
			const f = () => new Grid(4)
			expect(f).toThrow(Error)
		})

		test('sets correct properties for small grid', () => {
			const g = new Grid(3)

			expect(g.len).toEqual(3)
			expect(g.lastIdx).toEqual(2)
			expect(g.centerIdx).toEqual(1)
			expect(g.lenPx).toEqual(Grid.UNIT * 2)
			expect(g.centerPx).toEqual(Grid.HALF * 2)
		})

		test('sets correct properties for large grid', () => {
			const g = new Grid(69)

			expect(g.len).toEqual(69)
			expect(g.lastIdx).toEqual(68)
			expect(g.centerIdx).toEqual(34)
			expect(g.lenPx).toEqual(Grid.UNIT * 68)
			expect(g.centerPx).toEqual(Grid.HALF * 68)
		})
	})

	describe('Grid.node(x, y)', () => {
		test('returns top left node given top left coords', () => {
			const g = new Grid(3)
			const n = g.node(0, 0)

			expect(n).toEqual({
				id: 'COL_+000_+000_ROW_+000_+000',
				col: 0,
				row: 0,
				x: 0,
				y: 0,
				offX: 0,
				offY: 0,
				grid: g,
			})
		})

		test('returns bot right node given bot right coords', () => {
			const g = new Grid(3)
			const n = g.node(2, 2)

			expect(n).toEqual({
				id: 'COL_+002_+000_ROW_+002_+000',
				col: 2,
				row: 2,
				x: 8, // 2 * UNIT
				y: 8, // 2 * UNIT
				offX: 0,
				offY: 0,
				grid: g,
			})
		})

		test('returns center node given center coords', () => {
			const g = new Grid(3)
			const n = g.node(1, 1)

			expect(n).toEqual({
				id: 'COL_+001_+000_ROW_+001_+000',
				col: 1,
				row: 1,
				x: 4, // 1 * UNIT
				y: 4, // 1 * UNIT
				offX: 0,
				offY: 0,
				grid: g,
			})
		})

		test('returns offset node given offset', () => {
			const g = new Grid(5)
			const n = g.node(3, 3, -4, 4)

			expect(n).toEqual({
				id: 'COL_+003_-004_ROW_+003_+004',
				col: 3,
				row: 3,
				x: 8, // 3 * UNIT -4
				y: 16, // 3 * UNIT +4
				offX: -4,
				offY: 4,
				grid: g,
			})
		})

		test('throws error if given bad coords', () => {
			const g = new Grid(3)
			const f = () => g.node('moo', 0)
			expect(f).toThrow(Error)
		})

		test('throws error if given coords out of bounds', () => {
			const g = new Grid(3)
			const f = () => g.node(99, 99)
			expect(f).toThrow(Error)
		})
	})

	describe('Grid.shadowNode(x, y)', () => {
		test('returns top left node given top left coords', () => {
			const g = new Grid(3)
			const n = g.shadowNode(0, 0)

			expect(n).toEqual({
				id: 'COL_-002_+000_ROW_-002_+000',
				col: -2,
				row: -2,
				x: -8,
				y: -8,
				offX: 0,
				offY: 0,
				grid: g,
			})
		})

		test('returns bot right node given bot right coords', () => {
			const g = new Grid(3)
			const n = g.shadowNode(6, 6)

			expect(n).toEqual({
				id: 'COL_+004_+000_ROW_+004_+000',
				col: 4,
				row: 4,
				x: 16, // 4 * UNIT
				y: 16, // 4 * UNIT
				offX: 0,
				offY: 0,
				grid: g,
			})
		})

		test('returns center node given center coords', () => {
			const g = new Grid(3)
			const n = g.shadowNode(3, 3)

			expect(n).toEqual({
				id: 'COL_+001_+000_ROW_+001_+000',
				col: 1,
				row: 1,
				x: 4, // 1 * UNIT
				y: 4, // 1 * UNIT
				offX: 0,
				offY: 0,
				grid: g,
			})
		})
	})

	describe('Grid.center', () => {
		test('is center node', () => {
			const g = new Grid(5)

			expect(g.center).toEqual({
				id: 'COL_+002_+000_ROW_+002_+000',
				col: 2,
				row: 2,
				x: 8, // 2 * UNIT
				y: 8, // 2 * UNIT
				offX: 0,
				offY: 0,
				grid: g,
			})
		})
	})

	describe('Grid.parseXY(x, y)', () => {
		test('parses correctly given valid numbers', () => {
			const xy = Grid.parseXY(1, 2)
			expect(xy).toEqual({ x: 1, y: 2 })

			const xy2 = Grid.parseXY(-999, 999)
			expect(xy2).toEqual({ x: -999, y: 999 })
		})

		test('parses correctly given valid strings', () => {
			const xy = Grid.parseXY('1', '2')
			expect(xy).toEqual({ x: 1, y: 2 })
		})

		test('returns null given invalid string', () => {
			const xy = Grid.parseXY('1', 'meh')
			expect(xy).toEqual(null)
		})
	})

	describe('Grid.boundsIdx', () => {
		test('has correct boundsIdx', () => {
			const g = new Grid(5)

			expect(g.boundsIdx).toEqual({
				xMin: 0,
				xMax: 4,
				yMin: 0,
				yMax: 4,
			})
		})
	})

	describe('Grid.boundsPx', () => {
		test('has correct boundsPx', () => {
			const g = new Grid(5)

			expect(g.boundsPx).toEqual({
				xMin: 0,
				xMax: 16,
				yMin: 0,
				yMax: 16,
			})
		})
	})
})
