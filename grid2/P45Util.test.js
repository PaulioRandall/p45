import P45Util from './P45Util.js'
import P45Grid from './P45Grid.js'

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

describe('P45Util.indexToAlpha', () => {
	test('i === 0 === A', () => {
		const n = P45Util.indexToAlpha(0)
		expect(n).toEqual('A')
	})

	test('i === 25 === Z', () => {
		const n = P45Util.indexToAlpha(25)
		expect(n).toEqual('Z')
	})

	test('i === 26 === AA', () => {
		const n = P45Util.indexToAlpha(26)
		expect(n).toEqual('AA')
	})

	test('i === 702 === AAA', () => {
		const n = P45Util.indexToAlpha(702)
		expect(n).toEqual('AAA')
	})
})

describe('P45Util.nodeGenerator', () => {
	test('accepts numbers', () => {
		const g = new P45Grid(3)
		const nodes = P45Util.nodeGenerator(g)

		expect(nodes).toEqual({
			A0: g.n(0, 0),
			A1: g.n(0, 1),
			A2: g.n(0, 2),
			B0: g.n(1, 0),
			B1: g.n(1, 1),
			B2: g.n(1, 2),
			C0: g.n(2, 0),
			C1: g.n(2, 1),
			C2: g.n(2, 2),
		})
	})
})
