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

	//p24.p.let.o: Alias for origin.
	//p24.p.let.origin: Point to perform transformations around.
	//p24.d.p.let.origin: "A0"
	export let o = 'A0'
	export let origin = o

	//p24.p.let.flipX: True to flip along the x-axis.
	//p24.d.p.let.flipX: false
	export let flipX = false

	//p24.p.let.flipY: True to flip along the y-axis.
	//p24.d.p.let.flipY: false
	export let flipY = false

	//p24.p.let.moveX: Amount to translate along the x-axis.
	//p24.d.p.let.moveX: 0
	export let moveX = 0

	//p24.p.let.moveY: Amount to translate along the y-axis.
	//p24.d.p.let.moveY: 0
	export let moveY = 0

	//p24.p.let.translateX: Amount to translate along the x-axis.
	//p24.d.p.let.translateX: 0
	export let translateX = 0

	//p24.p.let.translateY: Amount to translate along the y-axis.
	//p24.d.p.let.translateY: 0
	export let translateY = 0

	//p24.p.let.scaleX: How much to scale along the x-axis.
	//p24.d.p.let.scaleX: 0
	export let scaleX = 0

	//p24.p.let.scaleY: How much to scale along the y-axis.
	//p24.d.p.let.scaleY: 0
	export let scaleY = 0

	//p24.p.let.skewX: How much to skew along the x-axis.
	//p24.d.p.let.skewX: 0
	export let skewX = 0

	//p24.p.let.skewY: How much to skew along the y-axis.
	//p24.d.p.let.skewY: 0
	export let skewY = 0

	//p24.p.let.rotate: Clockwise rotation in degrees.
	//p24.d.p.let.rotate: 0
	export let rotate = 0

	const originXY = g.parse(origin)
	const transform = parseCommands($$props).join(' ')
</script>

<g {...$$restProps} transform-origin="{originXY.x} {originXY.y}" {transform}>
	<slot />
</g>
