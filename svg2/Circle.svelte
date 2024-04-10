<script>
	import { getContext } from 'svelte'
	import P45Grid from '../grid/P45Grid.js'
	import P45Util from '../grid/P45Util.js'

	const grid = getContext('grid')

	// TODO: Play with passing simple string coords like A0, F12, or G04
	// TODO: Could also allow mix and match numbers and letters:
	// 0:0, 8:13, etc
	// A:F, D:C, etc
	// 5:F, B:16, etc
	// 4:C_-1:2 (Col 4 -1px, Row C +2px)

	export let origin = grid.center
	export let radius = 4

	$: r = P45Util.parseNumber(radius) * P45Grid.UNIT
</script>

<circle {...$$restProps} cx={origin.x} cy={origin.y} {r} />
