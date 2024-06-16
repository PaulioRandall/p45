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
			test(`"line to D3"`, () => {
				const act = parse(['line', 'to', 'D3'])
				expect(act).toEqual('L 3 3')
			})

			test(`"straight line to D3"`, () => {
				const act = parse(['straight', 'line', 'to', 'D3'])
				expect(act).toEqual('L 3 3')
			})

			test(`"draw line to D3"`, () => {
				const act = parse(['draw', 'line', 'to', 'D3'])
				expect(act).toEqual('L 3 3')
			})

			test(`"draw straight line to D3"`, () => {
				const act = parse(['draw', 'straight', 'line', 'to', 'D3'])
				expect(act).toEqual('L 3 3')
			})
		})

		describe('quadratic curve', () => {
			test(`"q curve to D3 with slope D0"`, () => {
				const act = parse(['q', 'curve', 'to', 'D3', 'with', 'slope', 'D0'])
				expect(act).toEqual('Q 3 0, 3 3')
			})

			test(`"quad curve to D3 with slope D0"`, () => {
				const act = parse(['quad', 'curve', 'to', 'D3', 'with', 'slope', 'D0'])
				expect(act).toEqual('Q 3 0, 3 3')
			})

			test(`"quadratic curve to D3 with slope D0"`, () => {
				const act = parse([
					'quadratic',
					'curve',
					'to',
					'D3',
					'with',
					'slope',
					'D0',
				])
				expect(act).toEqual('Q 3 0, 3 3')
			})

			test(`"draw quadratic curve to D3 with slope D0"`, () => {
				const act = parse([
					'draw',
					'quadratic',
					'curve',
					'to',
					'D3',
					'with',
					'slope',
					'D0',
				])
				expect(act).toEqual('Q 3 0, 3 3')
			})
		})

		describe('symmetric quadratic curve', () => {
			test(`"quadratic curve to D3"`, () => {
				const act = parse(['quadratic', 'curve', 'to', 'D3'])
				expect(act).toEqual('T 3 3')
			})

			test(`"quad curve to D3"`, () => {
				const act = parse(['quad', 'curve', 'to', 'D3'])
				expect(act).toEqual('T 3 3')
			})

			test(`"draw quadratic curve to D3"`, () => {
				const act = parse(['draw', 'quadratic', 'curve', 'to', 'D3'])
				expect(act).toEqual('T 3 3')
			})
		})

		describe('cubic curve', () => {
			test(`"curve to D3 with slope C2 and D0"`, () => {
				const act = parse([
					'curve',
					'to',
					'D3',
					'with',
					'slopes',
					'C2',
					'and',
					'D0',
				])
				expect(act).toEqual('C 2 2, 3 0, 3 3')
			})

			test(`"draw curve to D3 with slope C2 and D0"`, () => {
				const act = parse([
					'draw',
					'curve',
					'to',
					'D3',
					'with',
					'slopes',
					'C2',
					'and',
					'D0',
				])
				expect(act).toEqual('C 2 2, 3 0, 3 3')
			})
		})

		describe('symmetric cubic curve', () => {
			test(`"curve to D3 with slope D0"`, () => {
				const act = parse(['curve', 'to', 'D3', 'with', 'slope', 'D0'])
				expect(act).toEqual('S 3 0, 3 3')
			})

			test(`"draw curve to D3 with slope D0"`, () => {
				const act = parse(['draw', 'curve', 'to', 'D3', 'with', 'slope', 'D0'])
				expect(act).toEqual('S 3 0, 3 3')
			})
		})
	})
})
