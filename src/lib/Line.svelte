<script>
	import { getContext } from 'svelte'

	const g = getContext('p45-grid')

	//p24.p.let.f: Alias for from.
	//p24.p.let.from: The starting point.
	//p24.d.p.let.from: "B1"
	export let f = 'B1'
	export let from = f

	//p24.p.let.t: Alias for from.
	//p24.p.let.to: The starting point.
	//p24.d.p.let.to: "H7"
	export let t = 'H7'
	export let to = t

	const xy1 = g.parse(from)
	const xy2 = g.parse(to)
</script>

<line {...$$restProps} x1={xy1.x} y1={xy1.y} x2={xy2.x} y2={xy2.y} />
