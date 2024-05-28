<script>
	import { getContext } from 'svelte'

	const g = getContext('p45-grid')

	export let o = 'A0'
	export let origin = o

	export let r = g.size / 2
	export let radius = r

	const coords = g.parse(origin)
</script>

<circle cx={coords.x} cy={coords.y} r={radius} />
