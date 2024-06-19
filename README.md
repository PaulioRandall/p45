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
	export let origin = Grid.centerNode
</script>
```

```svelte
<Shape
	commands={/* Simple drawing */}
	transforms={/* Does nothing */}
	origin={Grid.centerNode}
/>
```

### `<Transform>`

Creates a group for simple transformations.

```svelte
<script>
	// Either an array off commands or a line separated list of commands.
	export let transforms = /* Does nothing */

	// Origin to use for transforms.
	export let origin = Grid.centerNode
</script>

<!-- Components and elements to transform. -->
<slot />
```

```svelte
<Transform
	transforms={/* Does nothing */}
	origin={Grid.centerNode}
>
	<div />
</Transform>
```
