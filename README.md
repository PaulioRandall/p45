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

```svelte
<script>
	// Alias for grid.
	export let g

	// An instance of the Grid class.
	export let grid
</script>
```

```svelte
<Icon
  g
  grid />
```

### `<Line>`

```svelte
<script>
	// Alias for from.
	export let f

	// The starting point.
	export let from = "B1"

	// Alias for from.
	export let t

	// The starting point.
	export let to = "H7"
</script>
```

```svelte
<Line
  f
  from="B1"
  t
  to="H7" />
```

### `<Polygon>`

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
