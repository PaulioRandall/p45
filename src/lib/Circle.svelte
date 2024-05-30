<script>
	import { getContext } from 'svelte'

	const g = getContext('p45-grid')

	//p24.p.let.o: Alias for origin.
	//p24.p.let.origin: Center point of the circle.
	//p24.d.p.let.origin: "E4"
	export let o = 'E4'
	export let origin = o

	//p24.p.let.r: Alias for radius.
	//p24.p.let.radius: Circle radius.
	//p24.d.p.let.radius: 3
	export let r = 3
	export let radius = r

	const cxy = g.parse(origin)
</script>

<circle {...$$restProps} cx={cxy.x} cy={cxy.y} r={radius} />
