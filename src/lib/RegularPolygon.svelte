<script context="module">
	import { getContext } from 'svelte'
	import Victor from 'victor'

	/*p24.description:
		The **RegularPolygon** component creates a regular polygon from an origin
		center point, number of edges, and radius to a vertex.
	*/

	const parseInt2 = (n) => {
		return Math.round(Number(n))
	}

	const generatePoints = (origin, sides, radius, rotate) => {
		const angle = 360 / sides
		const points = new Array(sides)

		for (let i = 0; i < sides; i++) {
			points[i] = makePoint(i, angle, radius, origin, rotate)
		}

		return points
	}

	const makePoint = (i, angle, radius, origin, rotate) => {
		const v = new Victor(0, radius)
		v.rotateDeg(angle * i - rotate)
		v.add(origin)

		const p = v.toObject()
		p.x = roundTo(p.x)
		p.y = roundTo(p.y)
		return p
	}

	const roundTo = (n, dp = 3) => {
		const mod = Math.pow(10, dp)
		return Math.round(n * mod) / mod
	}
</script>

<script>
	const g = getContext('p45-grid')

	//p24.p.let.o: Alias for start.
	//p24.p.let.origin: Origin node representing the center of the polygon.
	//p24.d.p.let.origin: "E4"
	export let o = 'E4'
	export let origin = o

	//p24.p.let.s: Alias for side.
	//p24.p.let.sides: Number of sides.
	//p24.d.p.let.sides: 6
	export let s = 6
	export let sides = s

	//p24.p.let.r: Alias for radius.
	//p24.p.let.radius: Radius to a vertex.
	//p24.d.p.let.radius: 3
	export let r = 3
	export let radius = r

	//p24.p.let.ro: Alias for rotate.
	//p24.p.let.rotate:
	// Amount to rotate counter clockwise in degrees, may be negative.
	//p24.d.p.let.rotate: 0
	export let ro = 0
	export let rotate = ro

	const points =
		generatePoints(
			g.parse(origin),
			parseInt2(sides),
			parseInt2(radius),
			parseInt2(rotate)
		) //
			.map(({ x, y }) => `${x},${y}`)
			.join(' ') + ' Z'
</script>

<polygon {...$$restProps} {points} />
