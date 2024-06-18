import DrawCmdParser from './DrawCmdParser.js'

describe('DrawCmdParser.js', () => {
	describe('parse', () => {
		describe('move', () => {
			test(`"move to D3"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'move', //
					'to',
					'D3',
				])

				expect(act).toEqual('M 3 3')
				expect(cp.start.x).toEqual(3)
				expect(cp.start.y).toEqual(3)
			})
		})

		describe('line', () => {
			test(`"line to D3"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'line', //
					'to',
					'D3',
				])

				expect(act).toEqual('L 3 3')
			})
		})

		describe('quadratic curve', () => {
			test(`"q curve to D3 with slope D0"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'q', //
					'curve',
					'to',
					'D3',
					'with',
					'slope',
					'D0',
				])

				expect(act).toEqual('Q 3 0, 3 3')
			})

			test(`"quad curve to D3 with slope D0"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'quad', //
					'curve',
					'to',
					'D3',
					'with',
					'slope',
					'D0',
				])

				expect(act).toEqual('Q 3 0, 3 3')
			})

			test(`"quadratic curve to D3 with slope D0"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'quadratic', //
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
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'quadratic', //
					'curve',
					'to',
					'D3',
				])

				expect(act).toEqual('T 3 3')
			})

			test(`"quad curve to D3"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'quad', //
					'curve',
					'to',
					'D3',
				])

				expect(act).toEqual('T 3 3')
			})
		})

		describe('cubic curve', () => {
			test(`"curve to D3 with slope C2 and D0"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'curve', //
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

		describe('symmetric quadratic cubic curve', () => {
			test(`"curve to D3 with slope D0"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'curve', //
					'to',
					'D3',
					'with',
					'slope',
					'D0',
				])

				expect(act).toEqual('S 3 0, 3 3')
			})
		})

		describe('line/curve to start', () => {
			test(`"line to start"`, () => {
				const cp = new DrawCmdParser()
				cp.start = { x: 1, y: 1 }

				const act = cp.parse([
					'line', //
					'to',
					'start',
				])

				expect(act).toEqual('L 1 1')
			})
		})

		describe('line/curve to center', () => {
			test(`"line to center"`, () => {
				const cp = new DrawCmdParser(100)
				const act = cp.parse([
					'line', //
					'to',
					'center',
				])

				expect(act).toEqual('L 50 50')
			})
		})

		describe('close path', () => {
			test(`"close path"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'close', //
					'path',
				])

				expect(act).toEqual('Z')
			})

			test(`"close path"`, () => {
				const cp = new DrawCmdParser()
				const act = cp.parse([
					'close', //
				])

				expect(act).toEqual('Z')
			})
		})
	})
})
