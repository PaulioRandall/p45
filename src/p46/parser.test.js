import parse from './parser.js'

describe('parser.js', () => {
	describe('parse', () => {
		test(`"move to D3"`, () => {
			const act = parse(['move', 'to', 'D3'])
			expect(act).toEqual('M 3 3')
		})

		test(`"straight line to D3"`, () => {
			const act = parse(['straight', 'line', 'to', 'D3'])
			expect(act).toEqual('L 3 3')
		})

		test(`"line to D3"`, () => {
			const act = parse(['line', 'to', 'D3'])
			expect(act).toEqual('L 3 3')
		})
	})
})
