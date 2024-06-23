import Grid from './Grid.js'

describe('Grid.js', () => {
	describe('nodeOf', () => {
		test('Simple coords', () => {
			const act = Grid.nodeOf(3, 3)
			expect(act).toEqual('D3')
		})

		test('Negative coords', () => {
			const act = Grid.nodeOf(-3, -3)
			expect(act).toEqual('-D-3')
		})

		test('0:0 coord', () => {
			const act = Grid.nodeOf(0, 0)
			expect(act).toEqual('A0')
		})
	})

	describe('parseNode', () => {
		test('Simple coords', () => {
			const act = Grid.parseNode('A0')

			expect(act.x).toEqual(0)
			expect(act.y).toEqual(0)
		})

		test('Odd coords', () => {
			const act = Grid.parseNode('D3')

			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})

		test('Two digit coords', () => {
			const act = Grid.parseNode('AA26')

			expect(act.x).toEqual(26)
			expect(act.y).toEqual(26)
		})

		test('Two digit odd coordinate', () => {
			const act = Grid.parseNode('DZ129')

			expect(act.x).toEqual(129)
			expect(act.y).toEqual(129)
		})

		test('Really try to screw up with big numbers', () => {
			const act = Grid.parseNode('DLT3035')

			// D: 2704
			// L: 312
			// T: 19

			expect(act.x).toEqual(3035)
			expect(act.y).toEqual(3035)
		})

		test('Negative coords', () => {
			const act = Grid.parseNode('-D-3')

			expect(act.x).toEqual(-3)
			expect(act.y).toEqual(-3)
		})

		test('Lowercase coords', () => {
			const act = Grid.parseNode('d3')

			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})
	})
})
