import { CMD, A } from './path.js'

const twoByTwo = { x: 2, y: 2 }
const fourByFour = { x: 4, y: 4 }

describe('path.js', () => {
	test('CMD', () => {
		const act = CMD('M', twoByTwo)
		expect(act).toEqual('M 2 2')
	})

	test('A', () => {
		const act = A(twoByTwo, fourByFour)
		expect(act).toEqual('A 2 2 0 0 0 4 4')
	})

	test('A with options', () => {
		const act = A(twoByTwo, fourByFour, {
			rotate: 90, //
			large: true, //
			clockwise: true, //
		})
		expect(act).toEqual('A 2 2 90 1 1 4 4')
	})
})
