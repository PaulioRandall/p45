import FreeGrid from './FreeGrid.js'

describe('FreeGrid.js', () => {
	test('Static function checkArgs', () => {
		let err

		err = FreeGrid.checkArgs(3, 2, { x: 0, y: 0 })
		expect(err).toEqual(null)

		// size

		err = FreeGrid.checkArgs(999, 2, { x: 0, y: 0 })
		expect(err).toEqual(null)

		err = FreeGrid.checkArgs(2, 2, { x: 0, y: 0 })
		expect(err).not.toEqual(null)

		err = FreeGrid.checkArgs(100, 2, { x: 0, y: 0 })
		expect(err).not.toEqual(null)

		// spacing

		err = FreeGrid.checkArgs(3, 200, { x: 0, y: 0 })
		expect(err).toEqual(null)

		err = FreeGrid.checkArgs(3, 1, { x: 0, y: 0 })
		expect(err).not.toEqual(null)

		err = FreeGrid.checkArgs(3, 3, { x: 0, y: 0 })
		expect(err).not.toEqual(null)

		// origin

		err = FreeGrid.checkArgs(3, 2, { x: 100, y: -100 })
		expect(err).toEqual(null)

		err = FreeGrid.checkArgs(3, 2, { x: '100', y: '100' })
		expect(err).toEqual(null)

		err = FreeGrid.checkArgs(3, 2, { x: 0 })
		expect(err).not.toEqual(null)

		err = FreeGrid.checkArgs(3, 2, 100)
		expect(err).not.toEqual(null)

		err = FreeGrid.checkArgs(3, 2, { x: 'abc', y: 0 })
		expect(err).not.toEqual(null)
	})

	test('Static function parseNumber', () => {
		let n

		n = FreeGrid.parseNumber(2)
		expect(n).toEqual(2)

		n = FreeGrid.parseNumber('2')
		expect(n).toEqual(2)

		n = FreeGrid.parseNumber('abc')
		expect(isNaN(n)).toEqual(true)

		n = FreeGrid.parseNumber({})
		expect(isNaN(n)).toEqual(true)

		n = FreeGrid.parseNumber(BigInt(2))
		expect(isNaN(n)).toEqual(true)
	})

	describe('GIVEN normal grid', () => {
		const g = new FreeGrid(5, 2, { x: 0, y: 0 })

		describe('THEN check property', () => {
			test('grid._lastIdx', () => {
				expect(g._lastIdx).toEqual(4)
			})

			test('grid._centerIdx', () => {
				expect(g._centerIdx).toEqual(2)
			})

			test('grid.origin', () => {
				expect(g.origin).toEqual({
					x: 0, //
					y: 0, //
				})
			})

			test('grid.lenXY', () => {
				expect(g.lenXY).toEqual(5)
			})

			test('grid.centerXY', () => {
				expect(g.centerXY).toEqual({
					x: 2, //
					y: 2, //
				})
			})

			test('grid.boundsXY', () => {
				expect(g.boundsXY).toEqual({
					xMin: 0, //
					xMax: 4, //
					yMin: 0, //
					yMax: 4, //
				})
			})

			test('grid.lenPx', () => {
				expect(g.lenPx).toEqual(8)
			})

			test('grid.centerPx', () => {
				expect(g.centerPx).toEqual({
					x: 4, //
					y: 4, //
				})
			})

			test('grid.boundsPx', () => {
				expect(g.boundsPx).toEqual({
					xMin: 0, //
					xMax: 8, //
					yMin: 0, //
					yMax: 8, //
				})
			})
		})
	})

	describe('GIVEN negative offset grid', () => {
		const g = new FreeGrid(5, 2, { x: -2, y: -2 })

		describe('THEN check property', () => {
			test('grid._lastIdx', () => {
				expect(g._lastIdx).toEqual(4)
			})
			test('grid._centerIdx', () => {
				expect(g._centerIdx).toEqual(2)
			})

			test('grid.origin', () => {
				expect(g.origin).toEqual({
					x: -2, //
					y: -2, //
				})
			})

			test('grid.lenXY', () => {
				expect(g.lenXY).toEqual(5)
			})

			test('grid.centerXY', () => {
				expect(g.centerXY).toEqual({
					x: 0, //
					y: 0, //
				})
			})

			test('grid.boundsXY', () => {
				expect(g.boundsXY).toEqual({
					xMin: -2, //
					xMax: 2, //
					yMin: -2, //
					yMax: 2, //
				})
			})

			test('grid.lenPx', () => {
				expect(g.lenPx).toEqual(8)
			})

			test('grid.centerPx', () => {
				expect(g.centerPx).toEqual({
					x: 0, //
					y: 0, //
				})
			})

			test('grid.boundsPx', () => {
				expect(g.boundsPx).toEqual({
					xMin: -4, //
					xMax: 4, //
					yMin: -4, //
					yMax: 4, //
				})
			})
		})
	})

	describe('GIVEN positive offset grid', () => {
		const g = new FreeGrid(5, 2, { x: 2, y: 2 })

		describe('THEN check property', () => {
			test('grid._lastIdx', () => {
				expect(g._lastIdx).toEqual(4)
			})
			test('grid._centerIdx', () => {
				expect(g._centerIdx).toEqual(2)
			})

			test('grid.origin', () => {
				expect(g.origin).toEqual({
					x: 2, //
					y: 2, //
				})
			})

			test('grid.lenXY', () => {
				expect(g.lenXY).toEqual(5)
			})

			test('grid.centerXY', () => {
				expect(g.centerXY).toEqual({
					x: 4, //
					y: 4, //
				})
			})

			test('grid.boundsXY', () => {
				expect(g.boundsXY).toEqual({
					xMin: 2, //
					xMax: 6, //
					yMin: 2, //
					yMax: 6, //
				})
			})

			test('grid.lenPx', () => {
				expect(g.lenPx).toEqual(8)
			})

			test('grid.centerPx', () => {
				expect(g.centerPx).toEqual({
					x: 8, //
					y: 8, //
				})
			})

			test('grid.boundsPx', () => {
				expect(g.boundsPx).toEqual({
					xMin: 4, //
					xMax: 12, //
					yMin: 4, //
					yMax: 12, //
				})
			})
		})
	})
})
