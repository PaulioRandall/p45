import CmdScanner from './CmdScanner.js'

describe('CmdScanner.js', () => {
	describe('string', () => {
		test('bad type returns error', () => {
			const f = () => new CmdScanner(null)
			expect(f).toThrow(Error)
		})

		test('bad command list item type returns error', () => {
			const f = () => new CmdScanner([null])
			expect(f).toThrow(Error)
		})
	})

	describe('string', () => {
		test('empty returns empty token array', () => {
			const cs = new CmdScanner('')
			expect(cs.len).toEqual(0)
		})

		test('only whitespace returns empty token array', () => {
			const cs = new CmdScanner('  \n\n  \t \r \n  ')
			expect(cs.len).toEqual(0)
		})

		test(`multiline returns array of commands as token array`, () => {
			const cs = new CmdScanner(`

				jump to D3

				straight line to G3

				straight line to G6

			`)

			expect(cs.next()).toEqual(['jump', 'to', 'D3'])
			expect(cs.next()).toEqual(['straight', 'line', 'to', 'G3'])
			expect(cs.next()).toEqual(['straight', 'line', 'to', 'G6'])
			expect(cs.empty()).toEqual(true)
		})
	})

	describe('command list', () => {
		test('empty command list returns empty token array', () => {
			const cs = new CmdScanner([])
			expect(cs.len).toEqual(0)
		})

		test('command list with only whitespace returns empty token array', () => {
			const cs = new CmdScanner(['  \n   ', '', '   \t \t '])
			expect(cs.len).toEqual(0)
		})

		test(`command list split up correctly`, () => {
			const cs = new CmdScanner(['  \n jump \n to \t \n D3 \n \t '])

			expect(cs.next()).toEqual(['jump', 'to', 'D3'])
			expect(cs.empty()).toEqual(true)
		})

		test(`multiline command list split up correctly`, () => {
			const cs = new CmdScanner([
				'jump to D3',
				'straight line to G3',
				'straight line to G6',
			])

			expect(cs.next()).toEqual(['jump', 'to', 'D3'])
			expect(cs.next()).toEqual(['straight', 'line', 'to', 'G3'])
			expect(cs.next()).toEqual(['straight', 'line', 'to', 'G6'])
			expect(cs.empty()).toEqual(true)
		})
	})
})
