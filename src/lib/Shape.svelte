<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a shape from three or more points.
	*/

	const g = getContext('p45-grid')

	//@prop commands
	// Either an array off commands or a line separated list of commands.
	// @default /* Simple drawing */
	export let draw = `
		move to E1
		line to H4
		line to G7
		line to E5
		line to C7
		line to B4
		close
	`

	//@prop transforms
	// Either an array off commands or a line separated list of commands.
	// @default /* Does nothing */
	export let transforms = ``

	//@prop origin
	// Origin to use for transforms.
	// @default Grid.centerNode
	export let origin = g.centerNode

	const parseOrigin = () => {
		if (origin === 'center') {
			origin = g.centerNode
		}

		const xy = g.parseNode(origin)
		return `${xy.x} ${xy.y}`
	}
</script>

<path
	{...$$restProps}
	transform-origin={parseOrigin()}
	d={g.parseDrawCommands(draw)}
	transform={g.parseTransformCommands(transforms)} />
