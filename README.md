![Made to be Plundered](https://img.shields.io/badge/Made%20to%20be%20Plundered-royalblue)
[![Latest version](https://img.shields.io/github/v/release/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)
[![Release date](https://img.shields.io/github/release-date/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)

# P45

Svelte library for programmatically crafting grid based SVG icons.

**Requires Svelte version 4.**

## Made to be Plundered

Fork, pillage, and plunder! Do whatever as long as you adhere to the project's permissive MIT license.

## Classes

### `P45`

The core class supplied to P45 components. It provides the context for P45 components such as grid size and certain named nodes, e.g. `centerNode`. It also provides functions for parsing command and transformation lists used by components such as `<Shape>` and `<Transform>`.

```js
import { P45 } from 'p45'
let p45

// A 24x24 pixel grid.
p45 = new P45()

// A 32x32 pixel grid.
// - Min 8
// - Max 64
// - Must be divisible by 2
p45 = new P45(32)
```

```svelte
<script>
	import { P45, Icon, Shape } from 'p45'

	const p45 = new P45()
</script>

<Icon {p45} width="300" height="300">
	<!-- Simple triangle -->
	<Shape
		draw="
		move to E20
		line to U20
		line to M4
		close
	" />
</Icon>
```

![Latest version](static/simple-triangle.svg)

## Components

### `<Circle>`

Creates a circle from a center origin and radius.

```svelte
<script>
  // P45 instance to use as grid and context.
  export let p45 = getContext('p45')

  // Circle center point.
  export let origin = p45.centerNode

  // Circle radius.
  export let radius = p45.center - 1
</script>

<!-- Any elements allowable within an SVG `<circle>`. -->
<slot />
```

```svelte
<Circle
  p45={getContext('p45')}
  origin={p45.centerNode}
  radius={p45.center - 1}
>
  <div />
</Circle>
```

### `<Icon>`

Container for slotted shapes that form an Icon.

It's represented by an svg element sized by the passed P45 instance.
Raw svg child elements maybe slotted in too.

```svelte
<script>
  // An instance of the P45 class.
  export let p45 = getContext('p45')

  // The icon's title applied using the SVG title tag.
  export let title = ""

  // Description of the icon applied using the SVG description tag.
  export let description = ""

  // P45 instance used to size the icon and parse nodes.
  setContext("p45", ...)
</script>

<!-- SVG elments and components that form the icon. -->
<slot />
```

```svelte
<Icon
  p45={getContext('p45')}
  title=""
  description=""
>
  <div />
</Icon>
```

### `<Mask>`

Creates a referencable mask to cut out shapes in other shapes.

```svelte
<script>
  // P45 instance to use as grid and context.
  export let p45 = getContext('p45')

  // Unique ID to reference the mask.
  export let id
</script>

<!-- SVG elments and components that form the mask. -->
<slot />
```

```svelte
<Mask
  p45={getContext('p45')}
  id
>
  <div />
</Mask>
```

### `<RegularPolygon>`

Creates a regular polygon from an origin center point, number of edges,
and radius to a vertex.

```svelte
<script>
  // P45 instance to use as grid and context.
  export let p45 = getContext('p45')

  // Origin to use for transforms.
  export let origin = p45.centerNode

  // Number of sides.
  export let sides = 6

  // Circle radius.
  export let radius = p45.center - 1

  // Amount to rotate counter clockwise in degrees, may be negative.
  export let rotate = 0
</script>

<!-- Any elements allowable within an SVG `<polygon>`. -->
<slot />
```

```svelte
<RegularPolygon
  p45={getContext('p45')}
  origin={p45.centerNode}
  sides={6}
  radius={p45.center - 1}
  rotate={0}
>
  <div />
</RegularPolygon>
```

### `<Shape>`

Creates a shape from three or more points.

```svelte
<script>
  // P45 instance to use as grid and context.
  export let p45 = getContext('p45')

  // Either an array off commands or a line separated list of commands.
  export let commands = /* Simple Wallace & Gromit rocket drawing */

  // ID of a mask cut out.
  export let mask = ""

  // Either an array off commands or a line separated list of commands.
  export let transforms = ""

  // Origin to use for transforms.
  export let origin = p45.centerNode
</script>

<!-- Any elements allowable within an SVG `<path>`. -->
<slot />
```

```svelte
<Shape
  p45={getContext('p45')}
  commands={/* Simple Wallace & Gromit rocket drawing */}
  mask=""
  transforms=""
  origin={p45.centerNode}
>
  <div />
</Shape>
```

### `<Transform>`

Creates a group for simple transformations.

```svelte
<script>
  // P45 instance to use as grid and context.
  export let p45 = getContext('p45')

  // Either an array off commands or a line separated list of commands.
  export let transforms = ""

  // Origin to use for transforms.
  export let origin = p45.centerNode
</script>

<!-- Components and elements to transform. -->
<slot />
```

```svelte
<Transform
  p45={getContext('p45')}
  transforms=""
  origin={p45.centerNode}
>
  <div />
</Transform>
```
