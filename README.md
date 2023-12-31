![Made to be Plundered](https://img.shields.io/badge/Made%20to%20be%20Plundered-royalblue)
[![Latest version](https://img.shields.io/github/v/release/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)
[![Release date](https://img.shields.io/github/release-date/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)

# P45

Svelte library for programmatically crafting grid based SVGs.

**Intentions**

I pivoted to become a Lean Data and Digital Services Specialist with the intention of generating much higher value at a much faster pace. A little while back I built a rather rough prototype tool <a href="https://skepticalgoose.com/treasury/prototype-svg-maker">(SVG Icon Maker)</a> for crafting SVG icons on the theme of grid based diagramming because existing tools where too fiddly and crafting by hand too tedious. This library is another, more refined, experiment.

Grid based diagramming aims to improve design speed, consistency, and experience by constraining where users can draw. **I like to think of it as trading-off freedom of expression for speed of expression.**

> "Craftsmen engage themselves in complex tasks. The complexity of those tasks often gives a simplicity to their lives." - Edward de Bono (May he RIP)

As craftsmen we find it difficult to resist the urge to apply such precision. It's in our nature. But unlike painting fine art, meticulousness does not pay off when drawing small web icons.

**Trade-offs**

The implementation is rather simple and can easily be replicated by an experienced Svelte-JavaScript engineer in a day or two. I could have gone a lot further with crafting utility components and functions but it's much more economical to employ an inclusion-by-need rather than inclusion-by-foresight policy.

Those articulate in mental visualisation and navigation may be able to work out grid coordinate in their head with ease. But for most of us it's just too taxing. So one caveat of my approach is that you'll usually want a paper grid to design on. Drawing the icons on paper (physical or digital) first is a lot easier. For simple shapes, mapping the coordinates should take a minute or two.

## Quick Start

### Dependency

_package.json_. Might have to be within `dependencies` in some scenarios.

```json
{
	"devDependencies": {
		"p45": "^v1.0.0"
	}
}
```

### Svelte Component

```html
<!-- Diamond.svelte -->

<script>
	import { Grid, SVG, Polygon, Path, J, M, L } from 'p45'

	// FYI: Grid instances are immutable.
	// You can share a single instance across
	// your whole project.
	const grid = new Grid(17) // 17x17 grid
</script>

<!-- 
	Make sure to set the grid property or SVG
	won't know how to setup your viewBox or
	map grid points from your components.
-->
<svg {grid}>
	<!-- grid.n is shorthand for grid.node -->
	<Polygon
		points="{["
		grid.n(1,
		4),
		grid.n(5,
		1),
		grid.n(11,
		1),
		grid.n(15,
		4),
		grid.n(8,
		15),
		]} />
	<!-- 
		J, M, & L functions are nothing special.
		They just convert grid coordinates in to
		SVG Path commands.
	-->
	<Path
		d="{J("
		M(grid.n(7,
		1)),
		L(grid.n(7,
		2)),
		L(grid.n(3,
		15)),
		L(grid.n(13,
		15)),
		L(grid.n(9,
		2)),
		L(grid.n(9,
		1))
		)} />
	<!-- 
		You can slot raw SVG elements in too or build
		your own Svelte components which have access
		to the grid and other properties via Svelte's
		getContext function.
	-->
</svg>
```

## The Grid

> TODO: Intro the grid

## The Components

> TODO: Intro the Svelte components

### `<SVG>`

> TODO

### `<Arc>`

> TODO

### `<Circle>`

> TODO

### `<Line>`

> TODO

### `<Path>`

> TODO

> TODO: Doc the path functions

### `<Polygon>`

> TODO

### `<RegularPolygon>`

> TODO

### `<Text>`

> TODO

## The Utilities

> TODO
