import P45SpacedGrid from './P45SpacedGrid.js'

const XY = (x, y) => ({ x, y })

describe('P45SpacedGrid.js', () => {
	test('P45SpacedGrid.checkSize', () => {
		let err

		err = P45SpacedGrid.checkSize(3)
		expect(err).toEqual(null)

		err = P45SpacedGrid.checkSize(999)
		expect(err).toEqual(null)

		err = P45SpacedGrid.checkSize(2)
		expect(err).not.toEqual(null)

		err = P45SpacedGrid.checkSize(100)
		expect(err).not.toEqual(null)
	})

	test('P45SpacedGrid.checkSpacing', () => {
		let err

		err = P45SpacedGrid.checkSpacing(2)
		expect(err).toEqual(null)

		err = P45SpacedGrid.checkSpacing(200)
		expect(err).toEqual(null)

		err = P45SpacedGrid.checkSpacing(1)
		expect(err).not.toEqual(null)

		err = P45SpacedGrid.checkSpacing(3)
		expect(err).not.toEqual(null)
	})

	test('P45SpacedGrid.checkOrigin', () => {
		let err

		err = P45SpacedGrid.checkOrigin({ x: 0, y: 0 })
		expect(err).toEqual(null)

		err = P45SpacedGrid.checkOrigin({ x: 100, y: -100 })
		expect(err).toEqual(null)

		err = P45SpacedGrid.checkOrigin({ x: '100', y: '100' })
		expect(err).toEqual(null)

		err = P45SpacedGrid.checkOrigin({ x: 0 })
		expect(err).not.toEqual(null)

		err = P45SpacedGrid.checkOrigin(100)
		expect(err).not.toEqual(null)

		err = P45SpacedGrid.checkOrigin({ x: 'abc', y: 0 })
		expect(err).not.toEqual(null)
	})

	describe('new P45SpacedGrid(<(0,0) origin>)', () => {
		const g = new P45SpacedGrid(5, 2, { x: 0, y: 0 })

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

			test('grid.centerXY', () => {
				expect(g.centerXY).toEqual({
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

	describe('new P45SpacedGrid(<negative origin>)', () => {
		const g = new P45SpacedGrid(5, 2, { x: -2, y: -2 })

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

			test('grid.centerXY', () => {
				expect(g.centerXY).toEqual({
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

	describe('new P45SpacedGrid(<positive origin>)', () => {
		const g = new P45SpacedGrid(5, 2, { x: 2, y: 2 })

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

			test('grid.centerXY', () => {
				expect(g.centerXY).toEqual({
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

	describe('WHEN grid.node called', () => {
		const g = new P45SpacedGrid(5, 2, { x: -2, y: -2 })

		test('GIVEN x and y of 0 RETURNS expected node', () => {
			const n = g.node(0, 0)

			expect(n).toEqual({
				coords: XY(0, 0),
				off: XY(0, 0),
				...XY(0, 0),
			})
		})

		test('GIVEN positive xy RETURNS expected node', () => {
			const n = g.node(2, 2)

			expect(n).toEqual({
				coords: XY(2, 2),
				off: XY(0, 0),
				...XY(4, 4),
			})
		})

		test('GIVEN negative xy RETURNS expected node', () => {
			const n = g.node(-2, -2)

			expect(n).toEqual({
				coords: XY(-2, -2),
				off: XY(0, 0),
				...XY(-4, -4),
			})
		})

		test('GIVEN offset RETURNS expected node', () => {
			const n = g.node(0, 0, -1, 3)

			expect(n).toEqual({
				coords: XY(0, 0),
				off: XY(-1, 3),
				...XY(-1, 3),
			})
		})
	})
})
