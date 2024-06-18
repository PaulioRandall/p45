import NodeParser from './NodeParser.js'

describe('NodeParser.js', () => {
	describe('parse', () => {
		test('Simple coords', () => {
			const act = NodeParser.parse('A0')

			expect(act.x).toEqual(0)
			expect(act.y).toEqual(0)
		})

		test('Odd coords', () => {
			const act = NodeParser.parse('D3')

			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})

		test('Two digit coords', () => {
			const act = NodeParser.parse('AA26')

			expect(act.x).toEqual(26)
			expect(act.y).toEqual(26)
		})

		test('Two digit odd coordinate', () => {
			const act = NodeParser.parse('DZ129')

			expect(act.x).toEqual(129)
			expect(act.y).toEqual(129)
		})

		test('Really try to screw up with big numbers', () => {
			const act = NodeParser.parse('DLT3035')

			// D: 2704
			// L: 312
			// T: 19

			expect(act.x).toEqual(3035)
			expect(act.y).toEqual(3035)
		})
	})
})
