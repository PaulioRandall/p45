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

The **Circle** component creates a circle from a center origin and radius.

```svelte
<script>
	// Alias for origin.
	export let o

	// Center point of the circle.
	export let origin = "E4"

	// Alias for radius.
	export let r

	// Circle radius.
	export let radius = 3
</script>
```

```svelte
<Circle
  o
  origin="E4"
  r
  radius={3} />
```

### `<Icon>`

The **Icon** component is a container for slotted shapes that form an
Icon.

It's represented by an svg element sized by the passed grid. This means
raw svg child elements maybe slotted in too.

```svelte
<script>
	// Alias for grid.
	export let g

	// An instance of the Grid class.
	export let grid = getContext('p45-grid')

	// The icon's title applied using the SVG title tag.
	export let title = ""

	// Description of the icon applied using the SVG description tag.
	export let description = ""

	// Grid used to size the icon and parse nodes.
	setContext('p45-grid', ...)
</script>
```

```svelte
<Icon
  g
  grid={getContext('p45-grid')}
  title=""
  description="" />
```

### `<Line>`

The **Line** component creates a line from two or more points. Each line
section will be straight.

```svelte
<script>
	// Alias for points.
	export let p

	// Points from line start to end, each separated by a comma.
	export let points = "B1,H7"

	// True to force use of the SVG path element even when an SVG line element
	// would do.
	export let usepath = false
</script>
```

```svelte
<Line
  p
  points="B1,H7"
  usepath={false} />
```

### `<Polygon>`

The **Polygon** component creates a polygon from a set of points.

```svelte
<script>
	// Alias for points.
	export let p

	// Comma separated list of nodes.
	export let points = "B1, H1, H7, B7"
</script>
```

```svelte
<Polygon
  p
  points="B1, H1, H7, B7" />
```
