// https://www.nan.fyi/svg-paths
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

export const cmd = (letter, ...coords) => {
	return letter + ' ' + coords.map(({ x, y }) => `${x} ${y}`).join(', ')
}

export const M = (to) => cmd('M', to)
export const Mr = (to) => cmd('m', to)

export const L = (to) => cmd('L', to)
export const Lr = (to) => cmd('l', to)

export const C = (cp1, cp2, to) => cmd('C', cp1, cp2, to)
export const Cr = (cp1, cp2, to) => cmd('c', cp1, cp2, to)

export const S = (cp2, to) => cmd('S', cp2, to)
export const Sr = (cp2, to) => cmd('s', cp2, to)

export const Q = (cp, to) => cmd('Q', cp, to)
export const Qr = (cp, to) => cmd('r', cp, to)

export const A = (r, to, options = {}) => _A('A', r, to, options)
export const Ar = (r, to, options = {}) => _A('a', r, to, options)

export const J = (...cmds) => cmds.join(' ')

export const JL = (...ps) => J(...ps.map((p) => L(p)))
export const JLr = (...ps) => J(...ps.map((p) => Lr(p)))

const _A = (letter, r, to, options = {}) => {
	const {
		rotate = 0, //
		large = false, //
		clockwise = false, //
	} = options

	return [
		letter,
		r.x,
		r.y,
		rotate,
		Number(!!large),
		Number(!!clockwise),
		to.x,
		to.y,
	].join(' ')
}

export default Object.freeze({
	cmd, //
	M, //
	Mr, //
	L, //
	Lr, //
	C, //
	Cr, //
	S, //
	Sr, //
	Q, //
	Qr, //
	A, //
	Ar, //
	J, //
	JL, //
	JLr, //
})
