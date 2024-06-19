<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a group for simple transformations.
	*/

	const g = getContext('p45-grid')

	//@prop transforms
	// Either an array off commands or a line separated list of commands.
	// @default /* Does nothing */
	export let transforms = ``

	//@prop origin
	// Origin to use for transforms.
	// @default Grid.centerNode
	export let origin = g.centerNode

	const parseOrigin = () => {
		const xy = g.parseNode(origin)
		return `${xy.x} ${xy.y}`
	}
</script>

<g
	{...$$restProps}
	transform-origin={parseOrigin()}
	transform={g.parseTransformCommands(transforms)}>
	<!--@slot
		Components and elements to transform.
	-->
	<slot />
</g>
