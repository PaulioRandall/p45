<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a shape from three or more points.
	*/

	const p45 = getContext('p45')

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

	//@prop mask
	// ID of a mask cut out.
	export let mask = ''

	//@prop transforms
	// Either an array off commands or a line separated list of commands.
	// @default /* Does nothing */
	export let transforms = ``

	//@prop origin
	// Origin to use for transforms.
	// @default P45.centerNode
	export let origin = p45.centerNode

	const parseOrigin = () => {
		if (origin === 'center') {
			origin = p45.centerNode
		}

		const xy = p45.parseNode(origin)
		return `${xy.x} ${xy.y}`
	}
</script>

<path
	stroke="currentColor"
	{...$$restProps}
	transform-origin={parseOrigin()}
	mask="url(#{mask})"
	d={p45.parseDrawCommands(draw)}
	transform={p45.parseTransformCommands(transforms)}>
	<!--@slot
		Animation and other inner elements.
	-->
	<slot />
</path>
