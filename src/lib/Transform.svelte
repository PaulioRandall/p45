<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a group for simple transformations.
	*/

	//@prop p45
	// P45 instance to use as grid and context.
	// @default getContext('p45')
	export let p45 = getContext('p45')

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

<g
	{...$$restProps}
	transform-origin={parseOrigin()}
	transform={p45.parseTransformCommands(transforms)}>
	<!--@slot
		Components and elements to transform.
	-->
	<slot />
</g>
