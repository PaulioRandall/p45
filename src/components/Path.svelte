<script context="module">
	export const J = (...commands) => commands.join(' ')

	export const L = ({ x, y }) => `L ${x} ${y}`

	export const M = ({ x, y }) => `M ${x} ${y}`

	export const C = (cp1, cp2, to) => {
		return `C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${to.x} ${to.y}`
	}

	export const S = (cp2, to) => {
		return `S ${cp2.x} ${cp2.y}, ${to.x} ${to.y}`
	}

	export const P = (...points) => {
		return J(...points.map((p) => L(p)))
	}

	export const A = (r, to, options = {}) => {
		const {
			rel = false, //
			rotate = 0, //
			large = false, //
			clockwise = false, //
		} = options

		return [
			rel ? 'a' : 'A',
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
