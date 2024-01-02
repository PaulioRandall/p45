![Made to be Plundered](https://img.shields.io/badge/Made%20to%20be%20Plundered-royalblue)
[![Latest version](https://img.shields.io/github/v/release/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)
[![Release date](https://img.shields.io/github/release-date/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)

# P45

Svelte library for programmatically crafting grid based SVGs.

Throughout this README I've used example based axiomatic definitions. My hoped for outcome is to strike a nice balance between concise communication of concepts and the precision needed for effective use of the library. I do hope it does not confuse.

**Intentions**

Grid based diagramming aims to improve design speed, consistency, and experience by constraining where users can draw. **I like to think of it as trading-off freedom of expression for speed of expression.**

A little while back I built a rather rough prototype tool [(SVG Icon Maker)](https://skepticalgoose.com/treasury/prototype-svg-maker) for crafting SVG icons on the theme of grid based diagramming because I find existing tools too fiddly and crafting SVGs by hand too tedious. This library is another, more refined, experiment.

> "Craftsmen engage themselves in complex tasks. The complexity of those tasks often gives a simplicity to their lives." - Edward de Bono (May he RIP)

I want to make drawing and diagramming quick and easy in scenarios where fine precision is not beneficial. As craftsmen we are inclined to precision; it's in our nature. But unlike painting fine art, meticulousness rarely pays off when drawing small web icons, especially regarding SVGs.

**Trade-offs**

This implementation is rather simple and can easily be replicated by an experienced Svelte-JavaScript engineer in a day or two. I could have gone a lot further with crafting utility components and functions but it's much more economic to employ an inclusion-by-need rather than inclusion-by-foresight policy.

Those articulate in mental visualisation may be able to work out grid coordinates in their head with ease, but for most of us it's just too taxing. So you'll want a visual grid on hand as reference. It also helps to rough draw the icons on paper (physical or digital) first. For simple shapes, mapping the coordinates to code shouldn't take more than a minute.

## Quick Start

### Dependency

_package.json_. May need to be within `dependencies` in some cases.

```json
{
	"devDependencies": {
		"p45": "^v1.0.0"
	}
}
```

### Svelte Component

```svelte
<!-- Diamond.svelte -->

<script>
	import { P45Grid, SVG, Polygon, Path, J, M, L } from 'p45'

	// FYI: P45Grid instances are immutable.
	// You can share a single instance across
	// your whole project.
	const grid = new P45Grid(17) // 17x17 grid
</script>

<!-- 
	Make sure to set the grid property or <SVG>
	won't know how to setup your viewBox or
	map grid points from your components.
-->
<svg {grid}>
	<!-- grid.n is shorthand for grid.node -->
	<Polygon
		points={[
			grid.n(1, 4),
			grid.n(5, 1),
			grid.n(11, 1),
			grid.n(15, 4),
			grid.n(8, 15),
		]} />
	<!-- 
		J, M, & L functions are nothing special.
		They just convert grid coordinates in to
		SVG Path commands.
	-->
	<Path
		d={J(
			M(grid.n(7, 1)),
			L(grid.n(7, 2)),
			L(grid.n(3, 15)),
			L(grid.n(13, 15)),
			L(grid.n(9, 2)),
			L(grid.n(9, 1))
		)} />
	<!-- 
		You can slot raw SVG elements in too or build
		your own Svelte components which have access
		to the grid and other properties via Svelte's
		getContext function.
	-->
</svg>
```

## The P45Grid

```js
import { P45Grid } from 'p45'

const g = new P45Grid(SIZE)
```

> TODO: Diagram of grid with annotated cell and annotated node as a visual reference for the text below.

The P45Grid is a simple JavaScript class with functions for generating nodes. Nodes are the points that make up a grid (or graph) as opposed to cells which are the square areas within a set of linked nodes.

Constructing a P45Grid instance requires a:

- **size** (width & height of the visible area):
	- **an odd integer** so we always have a center node;
	- **greater than 2** because anything smaller than _3x3_ has little use;

To allow control points to be placed off canvas, there exists a _shadow_ grid with the same center that is three times bigger than the _visible_ grid. Only drawings within the given size (visible grid) will be rendered.

### Properties

```js
// Note that this is mearly a user orientated
// representation of the algorithm and P45Grid
// properties, not the real thing.

import { P45Grid } from 'p45'

P45Grid.UNIT === 4
P45Grid.HALF === 2
P45Grid.idOf(col, row, offX = 0, offY = 0, shadow = false)

new P45Grid(size) === {
	UNIT: P45Grid.UNIT,
	HALF: P45Grid.HALF,

	// lastIdx is the last index of the shadow grid.
	lastIdx: Number,

	// centerIdx is the central index of both visible and shadow grids.
	centerIdx: Number,

	// The coordinate offset of the shadow grid from the visible grid.
	// The visible grid starts at the top left with (0,0).
	origin:	{
		x: Number,
		y: Number,
	}

	// centerXY holds the coordinates of the center node.
	centerXY: {
		x: Number,
		y: Number,
	}

	// bounds holds the coordinate bounds of the shadow grid.
	bounds: {
		xMin: Number,
		xMax: Number,
		yMin: Number,
		yMax: Number,
	}

	// boundsPx holds the pixel bounds of the shadow grid.
	boundsPx: bounds: {
		xMin: Number,
		xMax: Number,
		yMin: Number,
		yMax: Number,
	}

	// len is the length of the visible grid.
	len: Number,

	// lenPx is the pixel length of the visible grid.
	lenPx: Number,

	// centerNode is the node at the center of both shadow and visible grids.
	//
	// Invoking the node function with center coordinates will not result in
	// this object being returned but the contents will be identical.
	centerNode: {
		id,        // Unique ID of the node that includes offset
		coords: {  // Grid coordinates of the node on the visible grid.
			x,
			y,
		},
		off: {     // Offset in pixels.
			x,
			y,
		},
		x,         // SVG X pixel position.
		y,         // SVG Y pixel position.
		grid,      // Reference to the P45Grid that generated the node.
	},

	// center is an alias for centerNode.
	center: { /* see centerNode */ },

	// idOf is a proxy for P45Grid.idOf.
	idOf(col, row, offX = 0, offY = 0),

	// contains returns true if the passed coordinates are contained within the
	// shadow grid.
	contains(x = 0, y = 0),

	// containsPx returns true if the passed pixel positions are contained
	// within the shadow grid.
	containsPx(x = 0, y = 0),

	// node returns a Node object containing information about the node.
	//
	// Critically, it provides an x and y pixel position for plotting SVG
	// elements.
	node(x, y, offX = 0, offY = 0),

	// n is short hand alias for the node function.
	n(x, y, offX = 0, offY = 0),
}
```

#### `P45Grid.UNIT` & `P45Grid.HALF`

The distance between each node is fixed as _4_ and defined by `P45Grid.UNIT`. All calculations are performed from this such that:

```js
import { P45Grid } from 'p45'

P45Grid.UNIT === g.UNIT === 4
P45Grid.HALF === g.HALF === 2

const g = new P45Grid(9)

g.len === 9
g.lenPx === P45Grid.UNIT * (9 - 1)

visible_top__left == g.node(0, 0) == { x: 0, y: 0 }
visible_top_right == g.node(8, 0) == { x: 32, y: 0 }
visible_bot__left == g.node(0, 8) == { x: 0, y: 32 }
visible_bot_right == g.node(8, 8) == { x: 32, y: 32 }
```

#### `P45Grid.idOf`

Returns a unique ID for every combination of inputs which is designed to be easily parsed. Defining the format as an axiomatic example:

```js
// Numbers are always signed and padded with zeros.
const id = P45Grid.idOf(2, 4, 5, -5) == 'COL_+002_+005_ROW_+004_-005'

id.split('_') == [
	0: 'COL',
	1: '+002' == 2  == // column number,
	2: '+005' == 5  == // column offset in grid pixels,
	3: 'ROW',
	4: '+005' == 2  == // row number,
	5: '-005' == -5 == // row offset in grid pixels,
]
```

#### `P45Grid.node` & `P45Grid.n`

Visible nodes can be constructed by calling the `node` and `n` functions on a P45Grid instance. `n` being an alias of `node`. A new object is returned containing node properties in the form:

```js
// Note that this is mearly a user orientated
// representation of the algorithm and output.
grid.node(x, y, offX, offY) == {
	id: P45Grid.idOf(x, y, offX, offY),
	coords: {
		x: x,
		y: y,
	},
	off: {
		x: offX,
		y: offY,
	},
	x: x * P45Grid.UNIT + offX,
	y: y * P45Grid.UNIT + offY,
	grid: grid,
}
```

Such that:

```js
import { P45Grid } from 'p45'

const g = new P45Grid(9)

top__left == g.node(0, 0) == {
	id: `COL_+000_+000_ROW_+000_+000`,
	coords: {
		x: 0,
		y: 0,
	},
	off: {
		x: 0,
		y: 0,
	},
	x: 0,
	y: 0,
	grid: g,
}

bot_right == g.node(8, 8) == {
	id: `COL_+008_+000_ROW_+008_+000`,
	coords: {
		x: 8,
		y: 8,
	},
	off: {
		x: 0,
		y: 0,
	},
	x: 32, // Grid.UNIT * x
	y: 32, // Grid.UNIT * y
	grid: g,
}
```

## The Components

To make using SVG commands and drawing common shapes easier, P45 provides a set Svelte components that accept nodes as props. Only the _SVG_ component is needed, the others are more for convenience.

### `<SVG>`

The SVG component wraps `<svg>` applying the standard attributes, some default styling, and setting up the viewBox based on the provided grid.

Boilerplate for a new SVG Svelte component:

```svelte
<script>
	import { P45Grid, SVG } from 'p45'

	const grid = new P45Grid(3)
</script>

<SVG {grid}>
	<!-- SVG Commands -->
</SVG>
```

Add some elements to create an icon:

> TODO: Add SVG of the Clock icon

```svelte
<script>
	// Clock.svelte

	import { P45Grid, SVG, Line, Circle } from 'p45'
	const grid = new P45Grid(17)
</script>

<SVG {grid} stroke-linecap="round">
	<Circle o={grid.center} r="7" />
	<Line from={grid.center} to={grid.n(5, 5)} />
	<Line from={grid.center} to={grid.n(12, 4)} />
</SVG>
```

It accepts the following properties. They are all optional except for `grid`:

```js
	// grid is the P45Grid for layout.
	export let grid

	// offset from the top left.
	export let offset = { x: 0, y: 0 }

	// rotate clockwise in degrees around the icon center. 
	export let rotate = 0

	// flipX axis.
	export let flipX = false

	// flipY axis.
	export let flipY = false

	// title attribute of the SVG.
	export let title = undefined
```

The SVG component also sets context for all declared properties above. This means any slotted components have access to the grid via `getContext('grid')`.

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
