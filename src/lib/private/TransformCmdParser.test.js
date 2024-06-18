import TransformCmdParser from './TransformCmdParser.js'

describe('TransformCmdParser.js', () => {
	describe('parse', () => {
		describe('move', () => {
			test(`"move left by 3"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['move', 'left', 'by', '3'])
				expect(act).toEqual('translate(-3, 0)')
			})

			test(`"move right by 3"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['move', 'right', 'by', '3'])
				expect(act).toEqual('translate(3, 0)')
			})

			test(`"move up by 3"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['move', 'up', 'by', '3'])
				expect(act).toEqual('translate(0, -3)')
			})

			test(`"move down by 3"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['move', 'down', 'by', '3'])
				expect(act).toEqual('translate(0, 3)')
			})
		})

		describe('rotate', () => {
			test(`"rotate by 3"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['rotate', 'by', '3'])
				expect(act).toEqual('rotate(3)')
			})

			test(`"rotate by -3"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['rotate', 'by', '-3'])
				expect(act).toEqual('rotate(-3)')
			})
		})
	})
})
