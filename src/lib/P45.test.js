import P45 from './P45'

describe('P45.js', () => {
	describe('constructor', () => {
		test('Disallows invalid size', () => {
			const t = () => new P45(1)
			expect(t).toThrow(Error)
		})

		test('Allows valid size', () => {
			new P45(16)
		})

		test('Creates correct center node', () => {
			const g = new P45(16)
			expect(g.centerNode).toEqual('I8')
		})

		test('Creates correct center node', () => {
			const g = new P45(24)
			expect(g.centerNode).toEqual('M12')
		})

		test('Creates big grid', () => {
			const g = new P45(64)
			expect(g.centerNode).toEqual('AG32')
		})
	})

	describe('parse', () => {
		test('Commands', () => {
			const act = new P45(8).parseDrawCommands(`
				move to D3
				line to M3
				curve to V12 with slope V3
				line to V21
				line to M21
				curve to D12 with slope D21
				close
			`)

			const exp = [
				'M 3 3',
				'L 12 3',
				'S 21 3, 21 12',
				'L 21 21',
				'L 12 21',
				'S 3 21, 3 12',
				'Z',
			].join('\n')

			expect(act).toEqual(exp)
		})
	})
})
