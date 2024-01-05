<script>
	import { getContext } from 'svelte'
	import P45Grid from '../grid/P45Grid.js'
	import P45Util from '../grid/P45Util.js'

	const grid = getContext('grid')

	export let origin = grid.center
	export let radius = 4

	$: r = P45Util.parseNumber(radius) * P45Grid.UNIT
</script>

<circle {...$$restProps} cx={origin.x} cy={origin.y} {r} />
