import scan from './scanner.js'

const expectError = (err) => {
	expect(typeof err).toEqual('string')
	expect(err.length > 0).toEqual(true)
}

const expectArrayEquals = (act, exp) => {
	expect(Array.isArray(act)).toEqual(true)
	expect(Array.isArray(exp)).toEqual(true)

	const len = Math.max(act.length, exp.length)

	for (let i = 0; i < len; i++) {
		expect(act[i]).toEqual(exp[i])
	}
}

describe('scanner.js', () => {
	describe('scan', () => {
		describe('string', () => {
			test('bad type returns error', () => {
				const [lexemes, err] = scan(null)
				expectError(err)
			})

			test('bad command list item type returns error', () => {
				const [lexemes, err] = scan([null])
				expectError(err)
			})
		})

		// ######
		// STRING
		describe('string', () => {
			test('empty returns empty token array', () => {
				const [lexemes, err] = scan('')
				expect(err).toEqual(null)
				expect(lexemes.length).toEqual(0)
			})

			test('only whitespace returns empty token array', () => {
				const [lexemes, err] = scan('  \n\n  \t \r \n  ')
				expect(err).toEqual(null)
				expect(lexemes.length).toEqual(0)
			})

			test(`multiline returns array of commands as token array`, () => {
				const [act, err] = scan(`

				jump to D3

				straight line to G3

				straight line to G6

			`)

				const exp = [
					//
					['jump', 'to', 'D3'],
					['straight', 'line', 'to', 'G3'],
					['straight', 'line', 'to', 'G6'],
				]

				expect(err).toEqual(null)
				expectArrayEquals(act, exp)
			})
		})

		// ############
		// COMMAND LIST
		describe('command list', () => {
			test('empty command list returns empty token array', () => {
				const [lexemes, err] = scan([])
				expect(err).toEqual(null)
				expect(lexemes.length).toEqual(0)
			})

			test('command list with only whitespace returns empty token array', () => {
				const [lexemes, err] = scan(['  \n   ', '', '   \t \t '])
				expect(err).toEqual(null)
				expect(lexemes.length).toEqual(0)
			})

			test(`command list split up correctly`, () => {
				const [act, err] = scan([
					//
					'  \n jump \n to \t \n D3 \n \t ',
				])

				const exp = [
					//
					['jump', 'to', 'D3'],
				]

				expect(err).toEqual(null)
				expectArrayEquals(act, exp)
			})

			test(`multiline command list split up correctly`, () => {
				const [act, err] = scan([
					//
					'jump to D3',
					'straight line to G3',
					'straight line to G6',
				])

				const exp = [
					//
					['jump', 'to', 'D3'],
					['straight', 'line', 'to', 'G3'],
					['straight', 'line', 'to', 'G6'],
				]

				expect(err).toEqual(null)
				expectArrayEquals(act, exp)
			})
		})
	})
})
