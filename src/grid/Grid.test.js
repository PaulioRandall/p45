import Grid from './Grid.js'

describe('Grid.js', () => {
	describe('Grid.constructor(len)', () => {
		test('accepts odd numbered length', () => {
			new Grid(3)
		})

		test('throws if even numbered length', () => {
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
		describe('given numeric indexes', () => {
			test('given top left coords, returns top left cell', () => {
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

			test('given bot right coords, returns bot right cell', () => {
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

			test('given center coords, returns center cell', () => {
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

			test('given offset, returns offset cell', () => {
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
		})
	})

	describe('Grid.shadowNode(x, y)', () => {
		describe('given numeric indexes', () => {
			test('given top left coords, returns top left cell', () => {
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

			test('given bot right coords, returns bot right cell', () => {
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

			test('given center coords, returns center cell', () => {
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
	})

	describe('Grid.center()', () => {
		test('has center cell', () => {
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
		test('given valid numbers', () => {
			const xy = Grid.parseXY(1, 2)
			expect(xy).toEqual({ x: 1, y: 2 })

			const xy2 = Grid.parseXY(-999, 999)
			expect(xy2).toEqual({ x: -999, y: 999 })
		})

		test('given valid strings', () => {
			const xy = Grid.parseXY('1', '2')
			expect(xy).toEqual({ x: 1, y: 2 })
		})

		test('given invalid string, returns false', () => {
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
