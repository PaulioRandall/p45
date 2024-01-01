import OffsetGrid, { checkArgs } from './OffsetGrid.js'

describe('OffsetGrid.js', () => {
	test('Static function checkArgs', () => {
		let err

		err = checkArgs(3, { x: 0, y: 0 })
		expect(err).toEqual(null)

		// size

		err = checkArgs(999, { x: 0, y: 0 })
		expect(err).toEqual(null)

		err = checkArgs(2, { x: 0, y: 0 })
		expect(err).not.toEqual(null)

		err = checkArgs(100, { x: 0, y: 0 })
		expect(err).not.toEqual(null)

		// origin

		err = checkArgs(3, { x: 100, y: -100 })
		expect(err).toEqual(null)

		err = checkArgs(3, { x: '100', y: '100' })
		expect(err).toEqual(null)

		err = checkArgs(3, { x: 0 })
		expect(err).not.toEqual(null)

		err = checkArgs(3, 100)
		expect(err).not.toEqual(null)

		err = checkArgs(3, { x: 'abc', y: 0 })
		expect(err).not.toEqual(null)
	})

	describe('GIVEN normal grid', () => {
		const g = OffsetGrid(5, { x: 0, y: 0 })

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
		const g = OffsetGrid(5, { x: -2, y: -2 })

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
		const g = OffsetGrid(5, { x: 2, y: 2 })

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
})
