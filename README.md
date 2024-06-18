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
	// Either an array off commands or a line separated list of commands.
	export let commands = /* Simple drawing */

	// Either an array off commands or a line separated list of commands.
	export let transforms = /* Does nothing */

	// Origin to use for transforms.
	export let origin
</script>
```

```svelte
<Shape
	commands={/* Simple drawing */}
	transforms={/* Does nothing */}
	origin
/>
```

### `<Transform>`

Creates group with simple transformations.

```svelte
<script>
	// Point to perform transformations around.
	export let origin = Grid.centerNode

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
	origin={Grid.centerNode}
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
