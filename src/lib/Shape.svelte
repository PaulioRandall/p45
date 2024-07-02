<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a shape from three or more points.
	*/

	//@prop p45
	// P45 instance to use as grid and context.
	// @default getContext('p45')
	export let p45 = getContext('p45')

	//@prop commands
	// Either an array off commands or a line separated list of commands.
	// @default /* Simple Wallace & Gromit rocket drawing */
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
	// @default ""
	export let mask = ''

	//@prop transforms
	// Either an array off commands or a line separated list of commands.
	// @default ""
	export let transforms = ''

	//@prop origin
	// Origin to use for transforms.
	// @default p45.centerNode
	export let origin = p45.centerNode

	const parseOrigin = (origin) => {
		if (origin === 'center') {
			origin = p45.centerNode
		}

		const xy = p45.parseNode(origin)
		return `${xy.x} ${xy.y}`
	}

	const tryCatch = (f) => {
		try {
			f()
		} catch (err) {
			console.error(err)
		}
	}

	let d = ''
	let transform = ''
	let transformOrigin = ''

	$: tryCatch(() => (d = p45.parseDrawCommands(draw)))
	$: tryCatch(() => (transform = p45.parseTransformCommands(transforms)))
	$: tryCatch(() => (transformOrigin = parseOrigin(origin)))
</script>

<path
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...$$restProps}
	transform-origin={transformOrigin}
	mask="url(#{mask})"
	{d}
	{transform}>
	<!--@slot
		Any elements allowable within an SVG `<path>`.
	-->
	<slot />
</path>
