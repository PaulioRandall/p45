import parse from './parser.js'
import ShapeState from './ShapeState.js'

describe('parser.js', () => {
	describe('parse', () => {
		describe('move', () => {
			test(`"move to D3"`, () => {
				const shape = new ShapeState()

				const act = parse(shape, [
					'move', //
					'to',
					'D3',
				])

				expect(act).toEqual('M 3 3')
				expect(shape.getStart().x).toEqual(3)
				expect(shape.getStart().y).toEqual(3)
			})
		})

		describe('straight line', () => {
			test(`"line to D3"`, () => {
				const act = parse(new ShapeState(), [
					'line', //
					'to',
					'D3',
				])
				expect(act).toEqual('L 3 3')
			})

			test(`"straight line to D3"`, () => {
				const act = parse(new ShapeState(), [
					'straight', //
					'line',
					'to',
					'D3',
				])
				expect(act).toEqual('L 3 3')
			})

			test(`"draw line to D3"`, () => {
				const act = parse(new ShapeState(), [
					'draw', //
					'line',
					'to',
					'D3',
				])
				expect(act).toEqual('L 3 3')
			})

			test(`"draw straight line to D3"`, () => {
				const act = parse(new ShapeState(), [
					'draw', //
					'straight',
					'line',
					'to',
					'D3',
				])
				expect(act).toEqual('L 3 3')
			})
		})

		describe('quadratic curve', () => {
			test(`"q curve to D3 with slope D0"`, () => {
				const act = parse(new ShapeState(), [
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
				const act = parse(new ShapeState(), [
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
				const act = parse(new ShapeState(), [
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

			test(`"draw quadratic curve to D3 with slope D0"`, () => {
				const act = parse(new ShapeState(), [
					'draw', //
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
				const act = parse(new ShapeState(), [
					'quadratic', //
					'curve',
					'to',
					'D3',
				])
				expect(act).toEqual('T 3 3')
			})

			test(`"quad curve to D3"`, () => {
				const act = parse(new ShapeState(), [
					'quad', //
					'curve',
					'to',
					'D3',
				])
				expect(act).toEqual('T 3 3')
			})

			test(`"draw quadratic curve to D3"`, () => {
				const act = parse(new ShapeState(), [
					'draw', //
					'quadratic',
					'curve',
					'to',
					'D3',
				])
				expect(act).toEqual('T 3 3')
			})
		})

		describe('cubic curve', () => {
			test(`"curve to D3 with slope C2 and D0"`, () => {
				const act = parse(new ShapeState(), [
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

			test(`"draw curve to D3 with slope C2 and D0"`, () => {
				const act = parse(new ShapeState(), [
					'draw', //
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

		describe('symmetric quadratic cubic curve', () => {
			test(`"curve to D3 with slope D0"`, () => {
				const act = parse(new ShapeState(), [
					'curve', //
					'to',
					'D3',
					'with',
					'slope',
					'D0',
				])
				expect(act).toEqual('S 3 0, 3 3')
			})

			test(`"draw curve to D3 with slope D0"`, () => {
				const act = parse(new ShapeState(), [
					'draw', //
					'curve',
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
				const shape = new ShapeState()
				shape.setStart({ x: 1, y: 1 })

				const act = parse(shape, [
					'line', //
					'to',
					'start',
				])

				expect(act).toEqual('L 1 1')
			})
		})

		describe('line/curve to center', () => {
			test(`"line to center"`, () => {
				const shape = new ShapeState(100, 100)

				const act = parse(shape, [
					'line', //
					'to',
					'center',
				])

				expect(act).toEqual('L 50 50')
			})
		})

		describe('close path', () => {
			test(`"close path"`, () => {
				const act = parse(new ShapeState(), [
					'close', //
					'path',
				])

				expect(act).toEqual('Z')
			})

			test(`"close path"`, () => {
				const act = parse(new ShapeState(), [
					'close', //
				])

				expect(act).toEqual('Z')
			})
		})
	})
})
