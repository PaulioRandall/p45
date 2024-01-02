import P45Util from './P45Util.js'

describe('WHEN grid.contains called with', () => {
	const bounds = {
		xMin: 0,
		xMax: 4,
		yMin: 0,
		yMax: 4,
	}

	test('with values within bounds', () => {
		const ok = P45Util.contains(bounds, 2, 2)
		expect(ok).toEqual(true)
	})

	test('with too low x value', () => {
		const ok = P45Util.contains(bounds, -1, 2)
		expect(ok).toEqual(false)
	})

	test('with too high x value', () => {
		const ok = P45Util.contains(bounds, 5, 2)
		expect(ok).toEqual(false)
	})

	test('with too low y value', () => {
		const ok = P45Util.contains(bounds, 2, -1)
		expect(ok).toEqual(false)
	})

	test('with too high y value', () => {
		const ok = P45Util.contains(bounds, 2, 5)
		expect(ok).toEqual(false)
	})
})
