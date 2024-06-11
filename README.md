![Made to be Plundered](https://img.shields.io/badge/Made%20to%20be%20Plundered-royalblue)
[![Latest version](https://img.shields.io/github/v/release/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)
[![Release date](https://img.shields.io/github/release-date/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)

# P45

Svelte library for programmatically crafting grid based SVG icons.

**Requires Svelte version 4.**

## Made to be Plundered

Do whatever as long as you adhere to the permissive MIT license found within.

## Components

### `<Circle>`

Creates a circle from a center origin and radius.

```svelte
<script>
	// Circle center point.
	export let origin = Grid.centerNode

	// Circle radius.
	export let radius = Grid.center-1
</script>
```

```svelte
<Circle
	origin={Grid.centerNode}
	radius={Grid.center-1}
/>
```

### `<Icon>`

Container for slotted shapes that form an Icon.

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

Creates a line from two or more points.

```svelte
<script>
	// Comma separated list of points from first to last that represent a line.
	export let points = Grid.nodeOf(1, 1) + "," + Grid.nodeOf(Grid.size-1, Grid.size-1)
</script>
```

```svelte
<Line
	points={Grid.nodeOf(1, 1) + "," + Grid.nodeOf(Grid.size-1, Grid.size-1)}
/>
```

### `<Polygon>`

Creates a polygon from a set of points.

```svelte
<script>
	// Comma separated list of nodes.
	export let points = [
	Grid.nodeOf(1, 1),
  Grid.nodeOf(Grid.size-1, 1),
	Grid.nodeOf(Grid.size-1, Grid.size-1),
	Grid.nodeOf(1, Grid.size-1),
].join(',')
</script>
```

```svelte
<Polygon
	points={[
	Grid.nodeOf(1, 1),
  Grid.nodeOf(Grid.size-1, 1),
	Grid.nodeOf(Grid.size-1, Grid.size-1),
	Grid.nodeOf(1, Grid.size-1),
].join(',')}
/>
```

### `<RegularPolygon>`

Creates a regular polygon from an origin center point, number of edges,
		and radius to a vertex.

```svelte
<RegularPolygon />
```

### `<Shape>`

Creates a shape from three or more points.

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

Renders text.

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

Creates group with simple transformations.

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
