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

		describe('quadratic curve', () => {
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

		describe('symmetric quadratic curve', () => {
			test(`"continue curved line to D3"`, () => {
				const act = parse(['continue', 'curved', 'line', 'to', 'D3'])
				expect(act).toEqual('T 3 3')
			})
		})

		describe('cubic curve', () => {
			test(`"curved line to D3 with slope C2 and D0"`, () => {
				const act = parse([
					'curved',
					'line',
					'to',
					'D3',
					'with',
					'slopes',
					'C2',
					'and',
					'D0',
				])
				expect(act).toEqual('C 3 3, 2 2, 3 0')
			})

			test(`"draw curved line to D3 with slope C2 and D0"`, () => {
				const act = parse([
					'draw',
					'curved',
					'line',
					'to',
					'D3',
					'with',
					'slopes',
					'C2',
					'and',
					'D0',
				])
				expect(act).toEqual('C 3 3, 2 2, 3 0')
			})
		})

		describe('symmetric cubic curve', () => {
			test(`"continue curved line to D3 with slope D0"`, () => {
				const act = parse([
					'continue',
					'curved',
					'line',
					'to',
					'D3',
					'with',
					'slope',
					'D0',
				])
				expect(act).toEqual('S 3 3, 3 0')
			})

			test(`"continue drawing curved line to D3 with slope D0"`, () => {
				const act = parse([
					'continue',
					'drawing',
					'curved',
					'line',
					'to',
					'D3',
					'with',
					'slope',
					'D0',
				])
				expect(act).toEqual('S 3 3, 3 0')
			})
		})
	})
})
