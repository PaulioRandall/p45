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

		describe('scale', () => {
			test(`"scale width by 3.5"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['scale', 'width', 'by', '3.5'])
				expect(act).toEqual('scale(3.5, 1)')
			})

			test(`"scale x by -3.5"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['scale', 'x', 'by', '-3.5'])
				expect(act).toEqual('scale(-3.5, 1)')
			})

			test(`"scale height by 3.5"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['scale', 'height', 'by', '3.5'])
				expect(act).toEqual('scale(1, 3.5)')
			})

			test(`"scale y by -3"`, () => {
				const cp = new TransformCmdParser()
				const act = cp.parse(['scale', 'y', 'by', '-3.5'])
				expect(act).toEqual('scale(1, -3.5)')
			})
		})
	})
})
