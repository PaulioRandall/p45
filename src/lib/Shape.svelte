<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a shape from three or more points.
	*/

	const g = getContext('p45-grid')

	//@prop commands
	// Either an array off commands or a line separated list of commands.
	// @default /* Simple drawing */
	// @alias c
	export let c = `
		move to E1
		line to H4
		line to G7
		line to E5
		line to C7
		line to B4
		close
	`
	export let commands = c
</script>

<path {...$$restProps} d={g.parseCommands(commands)} />
