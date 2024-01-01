import SpacedGrid from './SpacedGrid.js'

const XY = (x, y) => ({ x, y })

describe('SpacedGrid.js', () => {
	test('Static function checkSpacing', () => {
		let err

		err = SpacedGrid.checkSpacing(200)
		expect(err).toEqual(null)

		err = SpacedGrid.checkSpacing(1)
		expect(err).not.toEqual(null)

		err = SpacedGrid.checkSpacing(3)
		expect(err).not.toEqual(null)
	})

	describe('WHEN grid.node called', () => {
		const g = new SpacedGrid(5, 2, { x: -2, y: -2 })

		test('GIVEN x and y of 0 RETURNS expected node', () => {
			const n = g.node(0, 0)

			expect(n).toEqual({
				xy: XY(0, 0),
				off: XY(0, 0),
				px: XY(0, 0),
				grid: g,
			})
		})

		test('GIVEN positive xy RETURNS expected node', () => {
			const n = g.node(2, 2)

			expect(n).toEqual({
				xy: XY(2, 2),
				off: XY(0, 0),
				px: XY(4, 4),
				grid: g,
			})
		})

		test('GIVEN negative xy RETURNS expected node', () => {
			const n = g.node(-2, -2)

			expect(n).toEqual({
				xy: XY(-2, -2),
				off: XY(0, 0),
				px: XY(-4, -4),
				grid: g,
			})
		})

		test('GIVEN offset RETURNS expected node', () => {
			const n = g.node(0, 0, -1, 3)

			expect(n).toEqual({
				xy: XY(0, 0),
				off: XY(-1, 3),
				px: XY(-1, 3),
				grid: g,
			})
		})
	})
})
