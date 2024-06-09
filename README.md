![Made to be Plundered](https://img.shields.io/badge/Made%20to%20be%20Plundered-royalblue)
[![Latest version](https://img.shields.io/github/v/release/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)
[![Release date](https://img.shields.io/github/release-date/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)

# P45

<div>
	<img src="/logo.svg" width="50" height="50" />
	<img src="/icons/smiley.svg" width="50" height="50" />
	<img src="/icons/clock.svg" width="50" height="50" />
	<img src="/icons/parabola.svg" width="50" height="50" />
	<img src="/icons/circle.svg" width="50" height="50" />
	<img src="/icons/diagonal.svg" width="50" height="50" />
	<img src="/icons/conical-flask.svg" width="50" height="50" />
	<img src="/icons/diamond.svg" width="50" height="50" />
	<img src="/icons/hexagon.svg" width="50" height="50" />
	<img src="/icons/squared.svg" width="50" height="50" />
</div>

<br/>

Svelte library for programmatically crafting grid based SVG icons.

**Requires Svelte version 4.**

## Made to be Plundered

Do whatever as long as you adhere to the permissive MIT license found within.

## Components

### `<Circle>`

The `<Circle>` component creates a circle from a center origin and radius.

```svelte
<script>
	// Circle center point.
	export let origin = "E4"

	// Circle radius.
	export let radius = 3
</script>
```

```svelte
<Circle
	origin="E4"
	radius={3}
/>
```

### `<Icon>`

The `<Icon>` component is a container for slotted shapes that form an
		Icon.

		It's represented by an svg element sized by the passed grid. This means
		raw svg child elements maybe slotted in too.

```svelte
<script>
	// An instance of the Grid class.
	export let grid = getContext('p45-grid')

	// The icon's title applied using the SVG title tag.
	export let title = ""

	// Description of the icon applied using the SVG description tag.
	export let description = ""

	// Grid used to size the icon and parse nodes.
	setContext("p45-grid", ...)
</script>

<!-- SVG elments and components that form the icon. -->
<slot />
```

```svelte
<Icon
	grid={getContext('p45-grid')}
	title=""
	description=""
>
	<div />
</Icon>
```

### `<Line>`

The `<Line>` component creates a line from two or more points.

```svelte
<script>
	// Comma separated list of points from first to last that represent a line.
	export let points = "B1,H7"
</script>
```

```svelte
<Line
	points="B1,H7"
/>
```

### `<Polygon>`

The `<Polygon>` component creates a polygon from a set of points.

```svelte
<script>
	// Comma separated list of nodes.
	export let points = "B1, H1, H7, B7"
</script>
```

```svelte
<Polygon
	points="B1, H1, H7, B7"
/>
```

### `<RegularPolygon>`

The `<RegularPolygon>` component creates a regular polygon from an origin
		center point, number of edges, and radius to a vertex.

```svelte
<RegularPolygon />
```

### `<Shape>`

The `<Shape>` component creates a shape from three or more points.

```svelte
<script>
	// Comma separated list of points from first to last that represent a shape.
	// The shape will complete itself with a straight line.
	export let points = "E1,H4,G7,E5,C7,B4"
</script>
```

```svelte
<Shape
	points="E1,H4,G7,E5,C7,B4"
/>
```

### `<Text>`

The `<Text>` component renders text.

```svelte
<script>
	// Node to render the text at.
	export let point = "E4"
</script>

<!-- Text and associated SVG text elements. -->
<slot />
```

```svelte
<Text
	point="E4"
>
	<div />
</Text>
```

### `<Transform>`

```svelte
<script>
	// Point to perform transformations around.
	export let origin = "A0"

	// True to flip along the x-axis.
	export let flipX = false

	// True to flip along the y-axis.
	export let flipY = false

	// Amount to translate along the x-axis.
	export let translateX = 0

	// Amount to translate along the y-axis.
	export let translateY = 0

	// How much to scale along the x-axis.
	export let scaleX = 0

	// How much to scale along the y-axis.
	export let scaleY = 0

	// How much to skew along the x-axis.
	export let skewX = 0

	// How much to skew along the y-axis.
	export let skewY = 0

	// Clockwise rotation in degrees.
	export let rotate = 0
</script>

<!-- Components and elements to transform. -->
<slot />
```

```svelte
<Transform
	origin="A0"
	flipX={false}
	flipY={false}
	translateX={0}
	translateY={0}
	scaleX={0}
	scaleY={0}
	skewX={0}
	skewY={0}
	rotate={0}
>
	<div />
</Transform>
```
