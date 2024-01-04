import P45Grid from './P45Grid.js'

const XY = (x, y) => ({ x, y })

describe('P45Grid.js', () => {
	describe('P45Grid.node(x, y)', () => {
		test('returns top left node given top left coords', () => {
			const g = new P45Grid(3)
			const n = g.node(0, 0)

			expect(n).toEqual({
				id: 'COL_+000_+000_ROW_+000_+000',
				coords: XY(0, 0),
				off: XY(0, 0),
				...XY(0, 0),
				grid: g,
			})
		})

		test('returns bot right node given bot right coords', () => {
			const g = new P45Grid(3)
			const n = g.node(2, 2)

			expect(n).toEqual({
				id: 'COL_+002_+000_ROW_+002_+000',
				coords: XY(2, 2),
				off: XY(0, 0),
				...XY(8, 8), // 2 * UNIT
				grid: g,
			})
		})

		test('returns center node given center coords', () => {
			const g = new P45Grid(3)
			const n = g.node(1, 1)

			expect(n).toEqual({
				id: 'COL_+001_+000_ROW_+001_+000',
				coords: XY(1, 1),
				off: XY(0, 0),
				...XY(4, 4), // 1 * UNIT
				grid: g,
			})
		})

		test('returns offset node given offset', () => {
			const g = new P45Grid(5)
			const n = g.node(3, 3, -4, 4)

			expect(n).toEqual({
				id: 'COL_+003_-004_ROW_+003_+004',
				coords: XY(3, 3),
				off: XY(-4, 4),
				x: 8, // 3 * UNIT -4
				y: 16, // 3 * UNIT +4
				grid: g,
			})
		})

		test('throws error if given bad coords', () => {
			const g = new P45Grid(3)
			const f = () => g.node('moo', 0)
			expect(f).toThrow(Error)
		})

		test('throws error if given coords out of bounds', () => {
			const g = new P45Grid(3)
			const f = () => g.node(99, 99)
			expect(f).toThrow(Error)
		})
	})

	describe('P45Grid.shadowNode(x, y)', () => {
		test('returns top left node given top left coords', () => {
			const g = new P45Grid(3)
			const n = g.node(-3, -3)

			expect(n).toEqual({
				id: 'COL_-003_+000_ROW_-003_+000',
				coords: XY(-3, -3),
				off: XY(0, 0),
				...XY(-12, -12), // -3 * UNIT
				grid: g,
			})
		})

		test('returns bot right node given bot right coords', () => {
			const g = new P45Grid(3)
			const n = g.node(5, 5)

			expect(n).toEqual({
				id: 'COL_+005_+000_ROW_+005_+000',
				coords: XY(5, 5),
				off: XY(0, 0),
				...XY(20, 20), // 5 * UNIT
				grid: g,
			})
		})

		test('returns center node given center coords', () => {
			const g = new P45Grid(3)
			const n = g.node(2, 2)

			expect(n).toEqual({
				id: 'COL_+002_+000_ROW_+002_+000',
				coords: XY(2, 2),
				off: XY(0, 0),
				...XY(8, 8), // 2 * UNIT
				grid: g,
			})
		})
	})

	describe('P45Grid.center', () => {
		test('is center node', () => {
			const g = new P45Grid(5)

			expect(g.centerNode).toMatchObject({
				id: 'COL_+002_+000_ROW_+002_+000',
				coords: XY(2, 2),
				off: XY(0, 0),
				...XY(8, 8), // 2 * UNIT
				grid: g,
			})
		})
	})
})
