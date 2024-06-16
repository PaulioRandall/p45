import parse from './parser.js'

describe('parser.js', () => {
	describe('parse', () => {
		describe('move', () => {
			test(`"move to D3"`, () => {
				const act = parse(['move', 'to', 'D3'])
				expect(act).toEqual('M 3 3')
			})
		})

		describe('straight line', () => {
			test(`"straight line to D3"`, () => {
				const act = parse(['straight', 'line', 'to', 'D3'])
				expect(act).toEqual('L 3 3')
			})

			test(`"line to D3"`, () => {
				const act = parse(['line', 'to', 'D3'])
				expect(act).toEqual('L 3 3')
			})

			test(`"draw line to D3"`, () => {
				const act = parse(['draw', 'line', 'to', 'D3'])
				expect(act).toEqual('L 3 3')
			})
		})

		describe('quadratic line', () => {
			test(`"curved line to D3 with slope D0"`, () => {
				const act = parse(['curved', 'line', 'to', 'D3', 'with', 'slope', 'D0'])
				expect(act).toEqual('Q 3 3, 3 0')
			})

			test(`"draw curved line to D3 with slope D0"`, () => {
				const act = parse([
					'draw',
					'curved',
					'line',
					'to',
					'D3',
					'with',
					'slope',
					'D0',
				])
				expect(act).toEqual('Q 3 3, 3 0')
			})
		})
	})
})
