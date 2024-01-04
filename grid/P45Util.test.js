import P45Util from './P45Util.js'

describe('P45Util.contains', () => {
	const bounds = {
		xMin: 0,
		xMax: 4,
		yMin: 0,
		yMax: 4,
	}

	test('values within bounds', () => {
		const ok = P45Util.contains(2, 2, bounds)
		expect(ok).toEqual(true)
	})

	test('too low x value', () => {
		const ok = P45Util.contains(-1, 2, bounds)
		expect(ok).toEqual(false)
	})

	test('too high x value', () => {
		const ok = P45Util.contains(5, 2, bounds)
		expect(ok).toEqual(false)
	})

	test('too low y value', () => {
		const ok = P45Util.contains(2, -1, bounds)
		expect(ok).toEqual(false)
	})

	test('too high y value', () => {
		const ok = P45Util.contains(2, 5, bounds)
		expect(ok).toEqual(false)
	})
})

describe('P45Util.checkXY', () => {
	test('accepts numbers', () => {
		const msg = P45Util.checkXY({ x: 0, y: 0 }, 'test')
		expect(msg).toEqual(null)
	})

	test('accepts string numbers', () => {
		const msg = P45Util.checkXY({ x: '99', y: 0 }, 'test')
		expect(msg).toEqual(null)
	})

	test('rejects bad number string prop', () => {
		const msg = P45Util.checkXY({ x: 'bad', y: 0 }, 'test')
		expect(typeof msg).toEqual('string')
		expect(!!msg).toEqual(true)
	})

	test('rejects missing prop', () => {
		const msg = P45Util.checkXY({ y: 0 }, 'test')
		expect(typeof msg).toEqual('string')
		expect(!!msg).toEqual(true)
	})

	test('rejects non-number prop', () => {
		const msg = P45Util.checkXY({ x: [], y: 0 }, 'test')
		expect(typeof msg).toEqual('string')
		expect(!!msg).toEqual(true)
	})
})
