<script context="module">
	const parseCommands = (props) => {
		const commands = []

		for (const name in props) {
			const cmd = parseCommand(name, props[name])
			if (cmd) {
				commands.push(cmd)
			}
		}

		return commands
	}

	const parseCommand = (name, value) => {
		if (name === 'moveX' || name === 'translateX') {
			return `translate(${value}, 0)`
		}

		if (name === 'moveY' || name === 'translateY') {
			return `translate(0, ${value})`
		}

		if (name === 'flipX') {
			return `scale(-1,1)`
		}

		if (name === 'flipY') {
			return `scale(1,-1)`
		}

		if (name === 'scaleX') {
			return `scale(${value}, 1)`
		}

		if (name === 'scaleY') {
			return `scale(1, ${value})`
		}

		if (name === 'skewX') {
			return `skewX(${value})`
		}

		if (name === 'skewY') {
			return `skewY(${value})`
		}

		if (name === 'rotate') {
			return `rotate(${value})`
		}

		return null
	}
</script>

<script>
	import { getContext } from 'svelte'

	/*p24.description:
		The **Transform** component allows simple transformations.
	*/

	const g = getContext('p45-grid')

	//@prop origin
	// Point to perform transformations around.
	// @default "A0"
	// @alias o
	export let o = 'A0'
	export let origin = o

	//p24.p.let.flipX: True to flip along the x-axis.
	//p24.d.p.let.flipX: false

	//@prop flipX
	// True to flip along the x-axis.
	// @default false
	export let flipX = false

	//@prop flipY
	// True to flip along the y-axis.
	// @default false
	export let flipY = false

	//@prop translateX
	// Amount to translate along the x-axis.
	// @default 0
	// @alias moveX
	export let moveX = 0
	export let translateX = 0

	//@prop translateY
	// Amount to translate along the y-axis.
	// @default 0
	// @alias moveY
	export let moveY = 0
	export let translateY = 0

	//@prop scaleX
	// How much to scale along the x-axis.
	// @default 0
	export let scaleX = 0

	//@prop scaleY
	// How much to scale along the y-axis.
	// @default 0
	export let scaleY = 0

	//@prop skewX
	// How much to skew along the x-axis.
	// @default 0
	export let skewX = 0

	//@prop skewY
	// How much to skew along the y-axis.
	// @default 0
	export let skewY = 0

	//@prop rotate
	// Clockwise rotation in degrees.
	// @default 0
	export let rotate = 0

	const originXY = g.parse(origin)
	const transform = parseCommands($$props).join(' ')
</script>

<g {...$$restProps} transform-origin="{originXY.x} {originXY.y}" {transform}>
	<!--@slot
		Components and elements to transform.
	-->
	<slot />
</g>
