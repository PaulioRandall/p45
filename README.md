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
  // P45 instance to use as grid and context.
  export let p45 = getContext('p45')

  // Circle center point.
  export let origin = P45.centerNode

  // Circle radius.
  export let radius = P45.center-1
</script>

<!-- Animation and other inner elements. -->
<slot />
```

```svelte
<Circle
  p45={getContext('p45')}
  origin={P45.centerNode}
  radius={P45.center-1}
>
  <div />
</Circle>
```

### `<Icon>`

Container for slotted shapes that form an Icon.

It's represented by an svg element sized by the passed P45b instance.
This means raw svg child elements maybe slotted in too.

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
```

```svelte
<Mask
  p45={getContext('p45')}
  id
/>
```

### `<RegularPolygon>`

Creates a regular polygon from an origin center point, number of edges,
and radius to a vertex.

```svelte
<script>
  // P45 instance to use as grid and context.
  export let p45 = getContext('p45')
</script>

<!-- Animation and other inner elements. -->
<slot />
```

```svelte
<RegularPolygon
  p45={getContext('p45')}
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
  export let commands = /* Simple drawing */

  // ID of a mask cut out.
  export let mask

  // Either an array off commands or a line separated list of commands.
  export let transforms = /* Does nothing */

  // Origin to use for transforms.
  export let origin = P45.centerNode
</script>

<!-- Animation and other inner elements. -->
<slot />
```

```svelte
<Shape
  p45={getContext('p45')}
  commands={/* Simple drawing */}
  mask
  transforms={/* Does nothing */}
  origin={P45.centerNode}
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
  export let transforms = /* Does nothing */

  // Origin to use for transforms.
  export let origin = P45.centerNode
</script>

<!-- Components and elements to transform. -->
<slot />
```

```svelte
<Transform
  p45={getContext('p45')}
  transforms={/* Does nothing */}
  origin={P45.centerNode}
>
  <div />
</Transform>
```
