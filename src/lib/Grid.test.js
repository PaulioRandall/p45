import Grid from './Grid'

describe('Grid.js', () => {
	describe('constructor', () => {
		test('Disallows invalid size', () => {
			const t = () => new Grid(1)
			expect(t).toThrow(Error)
		})

		test('Allows valid size', () => {
			new Grid(16)
		})

		test('Creates correct center node', () => {
			const g = new Grid(16)
			expect(g.centerNode).toEqual('I8')
		})

		test('Creates correct center node', () => {
			const g = new Grid(24)
			expect(g.centerNode).toEqual('M12')
		})
	})

	describe('parse', () => {
		test('Simple coords', () => {
			const act = new Grid(8).parse('A0')

			expect(act.type).toEqual('N')
			expect(act.x).toEqual(0)
			expect(act.y).toEqual(0)
		})

		test('Odd coords', () => {
			const act = new Grid(8).parse('D3')

			expect(act.type).toEqual('N')
			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})

		test('Two digit coords', () => {
			const act = new Grid(8).parse('AA26')

			expect(act.type).toEqual('N')
			expect(act.x).toEqual(26)
			expect(act.y).toEqual(26)
		})

		test('Two digit odd coordinate', () => {
			const act = new Grid(8).parse('DZ129')

			expect(act.type).toEqual('N')
			expect(act.x).toEqual(129)
			expect(act.y).toEqual(129)
		})

		test('Really try to screw up with big numbers', () => {
			const act = new Grid(8).parse('DLT3035')

			// D: 2704
			// L: 312
			// T: 19

			expect(act.type).toEqual('N')
			expect(act.x).toEqual(3035)
			expect(act.y).toEqual(3035)
		})

		test('With cubic curve', () => {
			const act = new Grid(8).parse('D3 C A6 J6')

			expect(act.type).toEqual('C')
			expect(act.cp1x).toEqual(0)
			expect(act.cp1y).toEqual(6)
			expect(act.cp2x).toEqual(9)
			expect(act.cp2y).toEqual(6)
			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})

		test('With symmetric curve', () => {
			const act = new Grid(8).parse('D3 S A6')

			expect(act.type).toEqual('S')
			expect(act.cp1x).toEqual(0)
			expect(act.cp1y).toEqual(6)
			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})

		test('With quadratic curve', () => {
			const act = new Grid(8).parse('D3 Q A6')

			expect(act.type).toEqual('Q')
			expect(act.cp1x).toEqual(0)
			expect(act.cp1y).toEqual(6)
			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})

		test('With smooth quadratic curve', () => {
			const act = new Grid(8).parse('D3 T')

			expect(act.type).toEqual('T')
			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})

		test('With line', () => {
			const act = new Grid(8).parse('D3 L')

			expect(act.type).toEqual('L')
			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})
	})
})
