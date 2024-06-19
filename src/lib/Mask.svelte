<script>
	import { getContext } from 'svelte'

	/*@component
		Creates a referencable mask to cut out shapes in other shapes.
	*/

	const g = getContext('p45-grid')

	//@prop id
	// Unique ID to reference the mask.
	export let id
</script>

<mask {id}>
	<rect
		x="0"
		y="0"
		width={g.size}
		height={g.size}
		fill="white"
		{...$$restProps} />
	<g stroke="black" fill="black">
		<slot />
	</g>
</mask>
