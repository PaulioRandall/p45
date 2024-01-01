import FreeGrid from './FreeGrid.js'

describe('FreeGrid.js', () => {
	describe('GIVEN normal grid', () => {
		const g = new FreeGrid(5, 2, { x: 0, y: 0 })

		describe('THEN check property', () => {
			test('grid._lastIdx', () => expect(g._lastIdx).toEqual(4))
			test('grid._centerIdx', () => expect(g._centerIdx).toEqual(2))

			test('grid.origin', () =>
				expect(g.origin).toEqual({
					x: 0, //
					y: 0, //
				}))

			test('grid.lenXY', () => expect(g.lenXY).toEqual(5))

			test('grid.centerXY', () =>
				expect(g.centerXY).toEqual({
					x: 2, //
					y: 2, //
				}))

			test('grid.boundsXY', () =>
				expect(g.boundsXY).toEqual({
					xMin: 0, //
					xMax: 4, //
					yMin: 0, //
					yMax: 4, //
				}))

			test('grid.lenPx', () => expect(g.lenPx).toEqual(8))

			test('grid.centerPx', () =>
				expect(g.centerPx).toEqual({
					x: 4, //
					y: 4, //
				}))

			test('grid.boundsPx', () =>
				expect(g.boundsPx).toEqual({
					xMin: 0, //
					xMax: 8, //
					yMin: 0, //
					yMax: 8, //
				}))
		})
	})

	describe('GIVEN negative offset grid', () => {
		const g = new FreeGrid(5, 2, { x: -2, y: -2 })

		describe('THEN check property', () => {
			test('grid._lastIdx', () => expect(g._lastIdx).toEqual(4))
			test('grid._centerIdx', () => expect(g._centerIdx).toEqual(2))

			test('grid.origin', () =>
				expect(g.origin).toEqual({
					x: -2, //
					y: -2, //
				}))

			test('grid.lenXY', () => expect(g.lenXY).toEqual(5))

			test('grid.centerXY', () =>
				expect(g.centerXY).toEqual({
					x: 0, //
					y: 0, //
				}))

			test('grid.boundsXY', () =>
				expect(g.boundsXY).toEqual({
					xMin: -2, //
					xMax: 2, //
					yMin: -2, //
					yMax: 2, //
				}))

			test('grid.lenPx', () => expect(g.lenPx).toEqual(8))

			test('grid.centerPx', () =>
				expect(g.centerPx).toEqual({
					x: 0, //
					y: 0, //
				}))

			test('grid.boundsPx', () =>
				expect(g.boundsPx).toEqual({
					xMin: -4, //
					xMax: 4, //
					yMin: -4, //
					yMax: 4, //
				}))
		})
	})

	describe('GIVEN positive offset grid', () => {
		const g = new FreeGrid(5, 2, { x: 2, y: 2 })

		describe('THEN check property', () => {
			test('grid._lastIdx', () => expect(g._lastIdx).toEqual(4))
			test('grid._centerIdx', () => expect(g._centerIdx).toEqual(2))

			test('grid.origin', () =>
				expect(g.origin).toEqual({
					x: 2, //
					y: 2, //
				}))

			test('grid.lenXY', () => expect(g.lenXY).toEqual(5))

			test('grid.centerXY', () =>
				expect(g.centerXY).toEqual({
					x: 4, //
					y: 4, //
				}))

			test('grid.boundsXY', () =>
				expect(g.boundsXY).toEqual({
					xMin: 2, //
					xMax: 6, //
					yMin: 2, //
					yMax: 6, //
				}))

			test('grid.lenPx', () => expect(g.lenPx).toEqual(8))

			test('grid.centerPx', () =>
				expect(g.centerPx).toEqual({
					x: 8, //
					y: 8, //
				}))

			test('grid.boundsPx', () =>
				expect(g.boundsPx).toEqual({
					xMin: 4, //
					xMax: 12, //
					yMin: 4, //
					yMax: 12, //
				}))
		})
	})
})
