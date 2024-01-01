import OffsetGrid from './OffsetGrid.js'

describe('OffsetGrid.js', () => {
	test('Static function checkArgs', () => {
		let err

		err = OffsetGrid.checkArgs(3, { x: 0, y: 0 })
		expect(err).toEqual(null)

		// size

		err = OffsetGrid.checkArgs(999, { x: 0, y: 0 })
		expect(err).toEqual(null)

		err = OffsetGrid.checkArgs(2, { x: 0, y: 0 })
		expect(err).not.toEqual(null)

		err = OffsetGrid.checkArgs(100, { x: 0, y: 0 })
		expect(err).not.toEqual(null)

		// origin

		err = OffsetGrid.checkArgs(3, { x: 100, y: -100 })
		expect(err).toEqual(null)

		err = OffsetGrid.checkArgs(3, { x: '100', y: '100' })
		expect(err).toEqual(null)

		err = OffsetGrid.checkArgs(3, { x: 0 })
		expect(err).not.toEqual(null)

		err = OffsetGrid.checkArgs(3, 100)
		expect(err).not.toEqual(null)

		err = OffsetGrid.checkArgs(3, { x: 'abc', y: 0 })
		expect(err).not.toEqual(null)
	})

	describe('GIVEN normal grid', () => {
		const g = new OffsetGrid(5, { x: 0, y: 0 })

		describe('THEN check property', () => {
			test('grid.lastIdx', () => {
				expect(g.lastIdx).toEqual(4)
			})

			test('grid.centerIdx', () => {
				expect(g.centerIdx).toEqual(2)
			})

			test('grid.origin', () => {
				expect(g.origin).toEqual({
					x: 0, //
					y: 0, //
				})
			})

			test('grid.len', () => {
				expect(g.len).toEqual(5)
			})

			test('grid.center', () => {
				expect(g.center).toEqual({
					x: 2, //
					y: 2, //
				})
			})

			test('grid.bounds', () => {
				expect(g.bounds).toEqual({
					xMin: 0, //
					xMax: 4, //
					yMin: 0, //
					yMax: 4, //
				})
			})
		})
	})

	describe('GIVEN negative offset grid', () => {
		const g = new OffsetGrid(5, { x: -2, y: -2 })

		describe('THEN check property', () => {
			test('grid.lastIdx', () => {
				expect(g.lastIdx).toEqual(4)
			})

			test('grid.centerIdx', () => {
				expect(g.centerIdx).toEqual(2)
			})

			test('grid.origin', () => {
				expect(g.origin).toEqual({
					x: -2, //
					y: -2, //
				})
			})

			test('grid.len', () => {
				expect(g.len).toEqual(5)
			})

			test('grid.center', () => {
				expect(g.center).toEqual({
					x: 0, //
					y: 0, //
				})
			})

			test('grid.bounds', () => {
				expect(g.bounds).toEqual({
					xMin: -2, //
					xMax: 2, //
					yMin: -2, //
					yMax: 2, //
				})
			})
		})
	})

	describe('GIVEN positive offset grid', () => {
		const g = new OffsetGrid(5, { x: 2, y: 2 })

		describe('THEN check property', () => {
			test('grid.lastIdx', () => {
				expect(g.lastIdx).toEqual(4)
			})

			test('grid.centerIdx', () => {
				expect(g.centerIdx).toEqual(2)
			})

			test('grid.origin', () => {
				expect(g.origin).toEqual({
					x: 2, //
					y: 2, //
				})
			})

			test('grid.len', () => {
				expect(g.len).toEqual(5)
			})

			test('grid.center', () => {
				expect(g.center).toEqual({
					x: 4, //
					y: 4, //
				})
			})

			test('grid.bounds', () => {
				expect(g.bounds).toEqual({
					xMin: 2, //
					xMax: 6, //
					yMin: 2, //
					yMax: 6, //
				})
			})
		})
	})

	describe('WHEN grid.contains called with', () => {
		const g = new OffsetGrid(5, { x: 0, y: 0 })

		test('with values within bounds', () => {
			const ok = g.contains(2, 2)
			expect(ok).toEqual(true)
		})

		test('with too low x value', () => {
			const ok = g.contains(-1, 2)
			expect(ok).toEqual(false)
		})

		test('with too high x value', () => {
			const ok = g.contains(5, 2)
			expect(ok).toEqual(false)
		})

		test('with too low y value', () => {
			const ok = g.contains(2, -1)
			expect(ok).toEqual(false)
		})

		test('with too high y value', () => {
			const ok = g.contains(2, 5)
			expect(ok).toEqual(false)
		})
	})
})
