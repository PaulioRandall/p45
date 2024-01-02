import Grid from './Grid.js'

describe('Grid.js', () => {
	describe('Grid.node(x, y)', () => {
		test('returns top left node given top left coords', () => {
			const g = new Grid(3)
			const n = g.node(0, 0)

			expect(n).toEqual({
				id: 'COL_+000_+000_ROW_+000_+000',
				xy: {
					x: 0,
					y: 0,
				},
				px: {
					x: 0,
					y: 0,
				},
				off: {
					x: 0,
					y: 0,
				},
				grid: g,
			})
		})

		test('returns bot right node given bot right coords', () => {
			const g = new Grid(3)
			const n = g.node(2, 2)

			expect(n).toEqual({
				id: 'COL_+002_+000_ROW_+002_+000',
				xy: {
					x: 2,
					y: 2,
				},
				px: {
					x: 8, // 2 * UNIT
					y: 8, // 2 * UNIT
				},
				off: {
					x: 0,
					y: 0,
				},
				grid: g,
			})
		})

		test('returns center node given center coords', () => {
			const g = new Grid(3)
			const n = g.node(1, 1)

			expect(n).toEqual({
				id: 'COL_+001_+000_ROW_+001_+000',
				xy: {
					x: 1,
					y: 1,
				},
				px: {
					x: 4, // 1 * UNIT
					y: 4, // 1 * UNIT
				},
				off: {
					x: 0,
					y: 0,
				},
				grid: g,
			})
		})

		test('returns offset node given offset', () => {
			const g = new Grid(5)
			const n = g.node(3, 3, -4, 4)

			expect(n).toEqual({
				id: 'COL_+003_-004_ROW_+003_+004',
				xy: {
					x: 3,
					y: 3,
				},
				px: {
					x: 8, // 3 * UNIT -4
					y: 16, // 3 * UNIT +4
				},
				off: {
					x: -4,
					y: 4,
				},
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
			const n = g.node(-3, -3)

			expect(n).toEqual({
				id: 'COL_-003_+000_ROW_-003_+000',
				xy: {
					x: -3,
					y: -3,
				},
				px: {
					x: -12,
					y: -12,
				},
				off: {
					x: 0,
					y: 0,
				},
				grid: g,
			})
		})

		test('returns bot right node given bot right coords', () => {
			const g = new Grid(3)
			const n = g.node(5, 5)

			expect(n).toEqual({
				id: 'COL_+005_+000_ROW_+005_+000',
				xy: {
					x: 5,
					y: 5,
				},
				px: {
					x: 20, // 5 * UNIT
					y: 20, // 5 * UNIT
				},
				off: {
					x: 0,
					y: 0,
				},
				grid: g,
			})
		})

		test('returns center node given center coords', () => {
			const g = new Grid(3)
			const n = g.node(2, 2)

			expect(n).toEqual({
				id: 'COL_+002_+000_ROW_+002_+000',
				xy: {
					x: 2,
					y: 2,
				},
				px: {
					x: 8, // 2 * UNIT
					y: 8, // 2 * UNIT
				},
				off: {
					x: 0,
					y: 0,
				},
				grid: g,
			})
		})
	})

	describe('Grid.center', () => {
		test('is center node', () => {
			const g = new Grid(5)

			expect(g.centerNode).toMatchObject({
				id: 'COL_+002_+000_ROW_+002_+000',
				xy: {
					x: 2,
					y: 2,
				},
				px: {
					x: 8, // 2 * UNIT
					y: 8, // 2 * UNIT
				},
				off: {
					x: 0,
					y: 0,
				},
				grid: g,
			})
		})
	})
})
