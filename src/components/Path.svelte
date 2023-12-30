<script context="module">
	// https://www.nan.fyi/svg-paths
	// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

	const fmtCmd = (cmd, ...coords) => {
		return cmd + ' ' + coords.map(({ x, y }) => `${x} ${y}`).join(', ')
	}

	export const J = (...cmds) => cmds.join(' ')

	export const L = (to) => fmtCmd('L', to)
	export const Lr = (to) => fmtCmd('l', to)

	export const M = (to) => fmtCmd('M', to)
	export const Mr = (to) => fmtCmd('m', to)

	export const C = (cp1, cp2, to) => fmtCmd('C', cp1, cp2, to)
	export const Cr = (cp1, cp2, to) => fmtCmd('c', cp1, cp2, to)

	export const S = (cp2, to) => fmtCmd('S', cp2, to)
	export const Sr = (cp2, to) => fmtCmd('s', cp2, to)

	export const Q = (cp, to) => fmtCmd('Q', cp, to)
	export const Qr = (cp, to) => fmtCmd('r', cp, to)

	export const P = (...points) => J(...points.map((p) => L(p)))
	export const Pr = (...points) => J(...points.map((p) => Lr(p)))

	export const A = (r, to, options = {}) => _A('A', r, to, options)
	export const Ar = (r, to, options = {}) => _A('r', r, to, options)

	const _A = (cmd, r, to, options = {}) => {
		const {
			rotate = 0, //
			large = false, //
			clockwise = false, //
		} = options

		return [
			cmd,
			r.x,
			r.y,
			rotate,
			Number(!!large),
			Number(!!clockwise),
			to.x,
			to.y,
		].join(' ')
	}
</script>

<script>
	export let d
</script>

<path {...$$restProps} vector-effect="non-scaling-stroke" {d} />
