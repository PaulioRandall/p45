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
	})

	describe('parse', () => {
		test('Simple coords', () => {
			const act = new Grid(8).parse('A0')

			expect(act.x).toEqual(0)
			expect(act.y).toEqual(0)
		})

		test('Odd coords', () => {
			const act = new Grid(8).parse('D3')

			expect(act.x).toEqual(3)
			expect(act.y).toEqual(3)
		})

		test('Two digit coords', () => {
			const act = new Grid(8).parse('AA26')

			expect(act.x).toEqual(26)
			expect(act.y).toEqual(26)
		})

		test('Two digit odd coordinate', () => {
			const act = new Grid(8).parse('DZ129')

			expect(act.x).toEqual(129)
			expect(act.y).toEqual(129)
		})

		test('Really try to screw it up', () => {
			const act = new Grid(8).parse('DLT3035')

			// D: 2704
			// L: 312
			// T: 19

			expect(act.x).toEqual(3035)
			expect(act.y).toEqual(3035)
		})
	})
})
