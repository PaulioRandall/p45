<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a referencable mask for cutting holes in other shapes.
	*/

	//@prop p45
	// P45 instance to use as grid and context.
	// @default getContext('p45')
	export let p45 = getContext('p45')

	//@prop id
	// Unique ID to reference the mask.
	export let id
</script>

<mask {id}>
	<rect
		x="0"
		y="0"
		width={p45.size}
		height={p45.size}
		stroke-width="0"
		{...$$restProps} />
	<!--@slot
			Elments and components that form the hole in the referencing shape.
		-->
	<slot />
</mask>
