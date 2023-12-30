// https://www.nan.fyi/svg-paths
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

export const CMD = (letter, ...coords) => {
	return letter + ' ' + coords.map(({ x, y }) => `${x} ${y}`).join(', ')
}

export const M = (to) => CMD('M', to)
export const Mr = (to) => CMD('m', to)

export const L = (to) => CMD('L', to)
export const Lr = (to) => CMD('l', to)

export const C = (cp1, cp2, to) => CMD('C', cp1, cp2, to)
export const Cr = (cp1, cp2, to) => CMD('c', cp1, cp2, to)

export const S = (cp2, to) => CMD('S', cp2, to)
export const Sr = (cp2, to) => CMD('s', cp2, to)

export const Q = (cp, to) => CMD('Q', cp, to)
export const Qr = (cp, to) => CMD('r', cp, to)

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
	CMD, //
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
