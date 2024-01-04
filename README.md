![Made to be Plundered](https://img.shields.io/badge/Made%20to%20be%20Plundered-royalblue)
[![Latest version](https://img.shields.io/github/v/release/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)
[![Release date](https://img.shields.io/github/release-date/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)

# P45

<div>
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

Svelte library for programmatically crafting grid based SVGs.

Throughout this README I've used example based axiomatic definitions. My hoped for outcome is to strike a nice balance between concise communication of concepts and the precision needed for effective use of the library. I do hope it does not confuse.

**Requires Svelte version 4.**

## Intentions

> "Craftsmen engage themselves in complex tasks. The complexity of those tasks often gives a simplicity to their lives." - Edward de Bono

I want to make drawing and diagramming quick and easy in scenarios where fine precision is not beneficial. As craftsmen we are inclined to precision; it's in our nature. But unlike painting fine art, meticulousness rarely pays off when drawing small web icons, especially SVGs.

Grid based diagramming aims to improve design speed, consistency, and experience by constraining where users to a grid. **I like to think of it as trading-off freedom of expression for speed of expression.**

A little while back I built a rough prototype [SVG Icon Maker](https://skepticalgoose.com/treasury/prototype-svg-maker) on the theme of grid based diagramming because I find existing tools too fiddly and crafting SVGs by hand too tedious. This library is another, more refined, experiment.

## Trade-offs

This implementation is rather simple and easily replicated. I could have gone a lot further with crafting utility components and functions but it's much more economic to employ an inclusion-by-need rather than inclusion-by-foresight policy.

Those articulate in mental visualisation may be able to effortlessly work out grid coordinates in their head, but most of us will want a visual grid on hand as reference. For non-trivial icons, it helps to do draw them out on paper first. Mapping the coordinates to code will be the quickest and easiest part.

## Quick Start

### Dependency

_package.json_. May need to be within `dependencies` in some scenarios.

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
	import { P45Grid, SVG, Polygon, Path, M, L } from 'p45'

	// P45Grid instances are immutable.
	// You can share a single instance across
	// your whole project.
	const grid = new P45Grid(17) // 17x17 grid
</script>

<!-- 
	Make sure to set the grid prop or <SVG>
	won't know how to setup your viewBox or
	map grid points.
-->
<SVG {grid}>
	<!-- grid.n is shorthand for grid.node -->
	<Polygon points={[
		grid.n(1, 4),
		grid.n(5, 1),
		grid.n(11, 1),
		grid.n(15, 4),
		grid.n(8, 15),
	]} />
	<!-- 
		M and L functions are nothing special.
		They just convert grid coordinates into
		SVG Path commands.
	-->
	<Path d={[
		M(grid.n(7, 1)),
		L(grid.n(7, 2)),
		L(grid.n(3, 15)),
		L(grid.n(13, 15)),
		L(grid.n(9, 2)),
		L(grid.n(9, 1))
	]} />
	<!-- 
		You can slot raw SVG elements in too or build
		your own Svelte components which have access
		to the grid and title props via Svelte's
		getContext function.
	-->
</SVG>
```

## The P45Grid

The P45Grid is a simple JavaScript class with functions for generating nodes. Nodes are the points that make up a grid (or graph) as opposed to cells which are the square areas within a set of linked nodes.

They require a _size_ for the width and height of the visible area. It must be an odd integer, so we always have a center node, and greater than 2, because anything smaller than _3x3_ is of little use.

```js
import { P45Grid } from 'p45'

const g = new P45Grid(size)
```

<img src="/icons/grid.svg" width="600" height="600" />

```js
// Note that this is an axiomatic representation
// of the algorithm and P45Grid properties, not
// the real thing.

import { P45Grid } from 'p45'

// UNIT is the spacing between nodes.
P45Grid.UNIT === 4

// HALF is half a UNIT.
P45Grid.HALF === 2

// idOf returns a unique ID for every combination of inputs which is designed
// to be easily parsed.
P45Grid.idOf(x, y, offX = 0, offY = 0)

new P45Grid(size) == {
	UNIT: P45Grid.UNIT,
	HALF: P45Grid.HALF,

	// lastIdx is the last index in the grid.
	lastIdx: size - 1,

	// centerIdx is the center index of both x and y planes.
	centerIdx: (size - 1) / 2,

	// centerXY holds the coordinates of the center node.
	centerXY: {
		x: (size - 1) / 2,
		y: (size - 1) / 2,
	},

	// bounds holds the min and max coordinate of the visible grid.
	//
	// Note that coordinates outside the visible grid are still valid.
	bounds: {
		xMin: 0,
		xMax: size - 1,
		yMin: 0,
		yMax: size - 1,
	},

	// boundsPx holds the pixel bounds of the grid.
	boundsPx: bounds: {
		xMin: 0,
		xMax: (size - 1) * P45Grid.UNIT,
		yMin: 0,
		yMax: (size - 1) * P45Grid.UNIT,
	},

	// len is the length of the visible grid.
	len: size,

	// lenPx is the pixel length of the visible grid.
	lenPx: (size - 1) * P45Grid.UNIT,

	// center is the node at the center of the grid.
	//
	// Invoking the node function with center coordinates
	// will not result in this object being returned but
	// the contents will be identical.
	center: {
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

	// idOf is a proxy for P45Grid.idOf.
	idOf(col, row, offX = 0, offY = 0),

	// contains returns true if the passed coordinates
	// are contained within the bounds.
	contains(x = 0, y = 0),

	// containsPx returns true if the passed pixel
	// positions are contained within the pixel bounds.
	containsPx(x = 0, y = 0),

	// node returns a Node object containing information
	// about the node. Notably, it provides an x and y
	// pixel position for plotting the SVG elements.
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
P45Grid.HALF === g.HALF === P45Grid.UNIT / 2

const g = new P45Grid(9)

g.len === 9
g.lenPx === (9 - 1) * P45Grid.UNIT

top__left == g.node(0, 0) == { x: 0,  y: 0  }
top_right == g.node(8, 0) == { x: 32, y: 0  }
bot__left == g.node(0, 8) == { x: 0,  y: 32 }
bot_right == g.node(8, 8) == { x: 32, y: 32 }
```

#### `P45Grid.idOf`

Returns a unique ID for every combination of inputs which is designed to be easily parsed. Defining the format as an axiomatic example:

```js
// Numbers are always signed and padded with zeros.
const id = P45Grid.idOf(2, -4, -5, 5)

id == 'COL_+002_-005_ROW_-004_+005'

id.split('_') == [
	0: 'COL',
	1: '+002' == 2  == // column number,
	2: '-005' == -5 == // column offset in grid pixels,
	3: 'ROW',
	4: '-004' == -4 == // row number,
	5: '+005' == 5  == // row offset in grid pixels,
]
```

#### `P45Grid.node` & `P45Grid.n`

Visible nodes can be constructed by calling the `node` and `n` functions on a P45Grid instance. `n` being an alias of `node`.

There is no constraint on coordinates when creating nodes. This allows `<path>` control points to be placed off canvas or for partial shapes to be drawn. This allows for greater flexibility but may require `overflow: hidden` on a container as off-grid drawings are visible by default.

A new object is returned in the form:

```js
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

To ease the use of SVG commands and drawing common shapes, P45 provides a set Svelte components that accept nodes as props. Only the _SVG_ component is needed, the others are more for convenience.

### `<SVG>`

SVG wraps the `<svg>` element applying the standard attributes, some default styling, and setting up the viewBox based on the grid.

SVG is immutable. This means your can create a single instance and share it. Furthermore, the SVG component also sets context for the _grid_ and _title_ properties so you don't need to pass a grid instance into your own SVG sub-components.

```js
export let grid // = P45Grid
export let title = undefined

setContext('grid', grid)
setContext('title', title)
```

Boilerplate for a new SVG Svelte component:

```svelte
<script>
	import { P45Grid, SVG } from 'p45'
	const grid = new P45Grid(3) // 3x3 grid
</script>

<SVG {grid}>
	<!-- SVG elements -->
</SVG>
```

Add some elements to create an icon:

<img src="/icons/clock.svg" width="100" height="100" />

```svelte
<!-- Clock.svelte -->

<script>
	import { P45Grid, SVG, Line, Circle } from 'p45'
	const grid = new P45Grid(17)
</script>

<SVG {grid} stroke-linecap="round">
	<Circle r="7" />
	<Line from={grid.center} to={grid.n(5, 5)} />
	<Line from={grid.center} to={grid.n(12, 4)} />
</SVG>
```

### `<Arc>`

Arc uses the `<path>` element with the `A` command to draw an arc. It's intended for use when you only need an arc by itself rather than as a larger shape. Use the `<Path>` component for anything more complex.

Arcs are easy enough to do without this component but I find the property names much more readable.

```js
export let from              // = { x: 0, y: 0 }
export let to                // = { x: 0, y: 0 }
export let radius            // = { x: 0, y: 0 }
export let rotate = 0        // in degrees
export let large = false
export let clockwise = false // AKA sweep-flag
```

<img src="/icons/parabola.svg" width="100" height="100" />

```svelte
<!-- Parabola.svelte -->

<script>
	import { P45Grid, SVG, Arc } from 'p45'
	const grid = new P45Grid(17)
</script>

<SVG {grid}>
	<Arc
		from={grid.n(2, 3)}
		to={grid.n(14, 3)}
		radius={{
			x: grid.HALF, //
			y: grid.HALF + 1.5, //
		}} />
</SVG>
```

### `<Circle>`

```js
export let origin = grid.center // = { x: 0, y: 0 }
export let radius = 4               // 1 <= radius <= 7
```

<img src="/icons/circle.svg" width="100" height="100" />

```svelte
<!-- Circle.svelte -->

<script>
	import { P45Grid, SVG, Circle } from 'p45'
	const grid = new P45Grid(17)
</script>

<SVG {grid}>
	<Circle radius="7" />
</SVG>
```

### `<Line>`

```js
export let from // { x: 0, y: 0 }
export let to   // { x: 0, y: 0 }
```

<img src="/icons/diagonal.svg" width="100" height="100" />

```svelte
<!-- Diagonal.svelte -->

<script>
	import { P45Grid, SVG, Line } from 'p45'
	const grid = new P45Grid(17)
</script>

<SVG {grid}>
	<Line from={grid.n(1, 15)} to={grid.n(15, 1)} />
</SVG>
```

### `<Path>`

Path generates a `<path>` element. If _d_ is an array the contents will be joined together using a single space, otherwise _d_ is assumed to be a string.

```js
export let d // = "" | [""]
```

To help craft the _d_ attribute a set of convenience functions maybe used:

```js
import {
	CMD, // CMD(letter, ...{ x: 0, y: 0 })
	M,   // Move
	Mr,  // Move (relative)
	L,   // Line
	Lr,  // Line (relative)
	C,   // Bézier curve
	Cr,  // Bézier curve (relative)
	S,   // Several Bézier curves
	Sr,  // Several Bézier curves (relative)
	Q,   // Quadratic curve
	Qr,  // Quadratic curve (relative)
	A,   // Arc
	Ar,  // Arc (relative)
	J,   // Join: joins together a list of { x: 0, y: 0 } with a single space.
} from 'p45'
```

<img src="/icons/conical-flask.svg" width="100" height="100" />

```svelte
<!-- ConicalFlask.svelte -->

<script>
	import { P45Grid, SVG, Path, M, L } from 'p45'
	const grid = new P45Grid(17)
</script>

<SVG {grid}>
	<Path	d={[
		M(grid.n(6, 1, grid.HALF)), //
		L(grid.n(6, 5, grid.HALF)), //
		L(grid.n(3, 15)), //
		L(grid.n(13, 15)), //
		L(grid.n(9, 5, grid.HALF)), //
		L(grid.n(9, 1, grid.HALF)) //
	]} />
</SVG>
```

### `<Polygon>`

Polygon produces a `<polygon>` element given an array of nodes or points.

```js
export let points // = [{ x: 0, y: 0 }]
```

<img src="/icons/diamond.svg" width="100" height="100" />

```svelte
<!-- Diamond.svelte -->

<script>
	import { P45Grid, SVG, Polygon } from 'p45'
	const grid = new P45Grid(17)
</script>

<SVG {grid}>
	<Polygon points={[
		grid.n(1, 4),
		grid.n(5, 1),
		grid.n(11, 1),
		grid.n(15, 4),
		grid.n(8, 15),
	]} />
</SVG>
```

### `<RegularPolygon>`

RegularPolygon generates a regular polygon using the `<polygon>` element, at the given origin, with the given _radius_, and the given number of _sides_:

```js
export let origin = grid.center  // = { x: 0, y: 0 }
export let radius = grid.center.x - grid.UNIT
export let sides = 6
```

<img src="/icons/hexagon.svg" width="100" height="100" />

```svelte
<!-- Hexagon.svelte -->

<script>
	import { P45Grid, SVG, RegularPolygon } from 'p45'
	const grid = new P45Grid(17)
</script>

<SVG {grid}>
	<RegularPolygon sides={6} />
</SVG>
```

### `<Text>`

Generates a `<text>` element at the given _origin_ and text as slotted content.

```js
export let origin = grid.center // = { x: 0, y: 0 }
```

<img src="/icons/squared.svg" width="100" height="100" />

```svelte
<!-- Squared.svelte -->

<script>
	import { P45Grid, SVG, Text } from 'p45'
	const grid = new P45Grid(17)
</script>

<SVG {grid} fill="grey">
	<style>
		.number {
			stroke-width: 1;
			font-size: 56px;
		}

		.power {
			stroke-width: 1;
			font-size: 24px;
		}
	</style>
	<Text class="number" origin={grid.n(2, 14, grid.HALF)}>
		n
	</Text>
	<Text class="power" origin={grid.n(10, 7, grid.HALF)}>
		2
	</Text>
</SVG>

```

### `<Transform>`

```js
// offset from the top left.
// Default indicates no offset.
export let offset = { x: 0, y: 0 }

// scale from the center.
// Default indicates no scaling.
export let scale  = { x: 1, y: 1 } 

// rotate clockwise in degrees around the icon center.
export let rotate = 0

// flipX flips on the x-axis from the center line.
export let flipX  = false

// flipY flips on the y-axis from the center line.
export let flipY  = false
```

The Transform component encapsulates slotted components with a `<g>` element and applies user transformations to it. All properties are optional:

Boilerplate Svelte component:

```svelte
<script>
	import { P45Grid, SVG, Transform } from 'p45'

	const grid = new P45Grid(3)
</script>

<SVG {grid}>
	<Transform {...}>
		<!-- SVG elements -->
	</Transform>
</SVG>
```

## P45RegPoly

```js
import { P45RegPoly } from 'p45'
```

P45RegPoly exposes functions useful for constructing or transforming a regular polygon.

```js
export default Object.freeze({
	// totalInternalAngle calculates the total internal angle of a regular
	// polygon with n sides.
	totalInternalAngle(n),

	// internalAngle calculates a single internal angle of a regular polyong with
	// n sides.
	internalAngle(n),

	// points generates an array of points, in the form { x, y }, that represent
	// a regular polygon.
	points(
		sides,  // Number of sides
		radius, // Radius to a vertex (not the apothem)
		options = {
			// Center point of the shape
			origin: { x: 0, y: 0 },
			// Clockwise rotation in degrees
			rotate: 0,
		}
	),
})
```

## P45Util

```js
import { P45Util } from 'p45'
```

P45Util exposes some utility functions used internally that may also be of use to you:

```js
export default Object.freeze({
	// roundTo rounds n to dp number of decimal places.
	roundTo(n, dp = 3),

	// parseNumber parses n into a number if it can, else it returns NaN.
	//
	// Unlike Number(n) no exception is thrown. NaN is always returned if
	// parsing fails.
	parseNumber(n),

	// parseXY returns a result object containing a possible err string prop,
	// an xy prop in the form { x, y } where both x and y are numbers, and a
	// wasObject flag indicating the passed x value was an object containing the
	// real x and y values.
	//
	// The input may either be two parsable numbers (x and y respectivily) or an
	// object containing parsable x and y props.
	parseXY(x, y),

	// checkXY returns a string error message if the xy object argument does not
	// satisfy the { x: Number, y: Number }. Else returns null.
	checkXY(xy, ref = 'xy'),

	// within returns true if the number n is contained within the bounds.
	within(n, min, max),

	// contains returns true if the x and y are contained within the bounds.
	//
	// bounds = {
	//   xMin,
	//   xMax,
	//   yMin,
	//   yMax,
	// }
	contains(x, y, bounds),
})
```
