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

## Explore

- [Intentions](#intentions)
- [Trade-offs](#trade-offs)
- [Quick Start](#quick-start)
	- [Dependency](#dependency)
	- [Svelte Component](#svelte-component)
- [P45Grid](#p45grid)
	- [.UNIT & .HALF](#unit--half)
	- [.idOf](#idof)
	- [.node & .n](#node--n)
- [Svelte Components](#svelte-components)
	- [&lt;SVG&gt;](#svg)
	- [&lt;Arc&gt;](#arc)
	- [&lt;Circle&gt;](#circle)
	- [&lt;Line&gt;](#line)
	- [&lt;Path&gt;](#path)
	- [&lt;Polygon&gt;](#polygon)
	- [&lt;RegularPolygon&gt;](#regularpolygon)
	- [&lt;Text&gt;](#text)
	- [&lt;Transform&gt;](#transform)
- [P45RegPoly](#p45regpoly)
- [P45Util](#p45util)

## Intentions

> "Craftsmen engage themselves in complex tasks. The complexity of those tasks often gives a simplicity to their lives." - Edward de Bono

I want to make drawing and diagramming quick and easy in scenarios where fine precision is not beneficial. As craftsmen we are inclined to precision; it's in our nature. But unlike painting fine art, meticulousness rarely pays off when drawing small web icons, especially SVGs.

Grid based diagramming aims to improve design speed, consistency, and experience by constraining users to a grid. **I like to think of it as trading-off freedom of expression for speed of expression.**

A little while back I built a rough prototype [SVG Icon Maker](https://skepticalgoose.com/treasury/prototype-svg-maker) on the theme of grid based diagramming because I find existing tools too fiddly and crafting SVGs by hand too tedious. This library is another, more refined, experiment.

## Trade-offs

This implementation is rather simple and easily replicated. I could have gone a lot further with crafting utility components and functions but it's much more economic to employ an inclusion-by-need rather than inclusion-by-foresight policy.

Those skilled in mental visualisation may be able to effortlessly work out grid coordinates in their head, but the rest of us will benefit from a reference grid. For non-trivial icons, it helps to quickly draw them out freeform on paper first. Mapping the coordinates to code is probably the quickest and easiest part.

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
	won't know how to setup your viewBox and
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

## P45Grid

P45Grid is a simple JavaScript class with functions for generating nodes. Nodes are objects representing the canvas and control points that make up a grid (square node graph).

The only parameter is _size_ which determines number of horizontal and vertical nodes in the visible area. It must be an odd integer, so we always have a center node, and greater than 2, because anything smaller than _3x3_ is of little use.

I like _9x9_, _13x13_, and _17x17_ grids because they create grids with 8, 12, and 16 cells respectively (got to satisfy those orderliness cravings somehow).

```js
import { P45Grid } from 'p45'

const g = new P45Grid(size)
```

The following is an annotated _9x9_ grid for reference. And yes, I crafted using P45, copied outer HTML, and finished by cleaning up classes etc:

<img src="/icons/grid.svg" width="600" height="600" />

And this is an attempt at an axiomatic representation on the P45Grid class members and functions. Remember it's not the real thing, just a form of specification and documentation that JavaScript programmers should hopefully understand:

```js
import { P45Grid } from 'p45'

// UNIT is the spacing between nodes.
P45Grid.UNIT === 4

// HALF is half a UNIT.
P45Grid.HALF === 2

// idOf returns a unique ID for every combination of inputs which is designed
// to be easily parsed.
P45Grid.idOf(x, y, offX = 0, offY = 0)

new P45Grid(size) == {
	UNIT: P45Grid.UNIT === 4,
	HALF: P45Grid.HALF === 2,

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
		// Unique ID of the node including offset
		id: P45Grid.idOf(x, y, offX, offY),
		// Coordinates of the node on the visible 
		coords: {
			x: x,
			y: y,
		},
		// Offset in pixels
		off: {
			x: offX,
			y: offY,
		},
		// View box pixel positions
		x: x * P45Grid.UNIT + offX,
		y: y * P45Grid.UNIT + offY,
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

### .UNIT & .HALF

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

### .idOf

Returns a unique ID for every combination of input. The result is designed to be easily parsed. Defining the format as an axiomatic example:

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

### .node & .n

Visible nodes can be constructed by calling the `node` and `n` functions on a P45Grid instance. `n` being an alias of `node`.

There is no constraint on coordinates when creating nodes. This allows `<path>` control points to be placed off canvas or to draw shapes that are only partial on grid. This allows for greater flexibility but may require `overflow: hidden` on a container as off-grid drawings are visible by default.

A new node object is returned in the form:

```js     
grid.node(x, y, offX, offY) == {
	// Unique ID of the node including offset
	id: P45Grid.idOf(x, y, offX, offY),
	// Coordinates of the node on the visible 
	coords: {
		x: x,
		y: y,
	},
	// Offset in pixels
	off: {
		x: offX,
		y: offY,
	},
	// View box pixel positions
	x: x * P45Grid.UNIT + offX,
	y: y * P45Grid.UNIT + offY,
}
```

Such that:

```js
import { P45Grid } from 'p45'

const g = new P45Grid(9)

top__left == g.node(0, 0) == {
	id: `COL_+000_+000_ROW_+000_+000`,
	coords: { x: 0, y: 0 },
	off:    { x: 0, y: 0 },
	x: 0,   // Grid.UNIT * 0
	y: 0,   // Grid.UNIT * 0
}

bot_right == g.node(8, 8) == {
	id: `COL_+008_+000_ROW_+008_+000`,
	coords: { x: 8, y: 8 },
	off:    { x: 0, y: 0 },
	x: 32,  // Grid.UNIT * 8
	y: 32,  // Grid.UNIT * 8
}
```

## Svelte Components

To ease the use of SVG commands and drawing common shapes, P45 provides a set Svelte components that accept nodes as props. Only the _SVG_ component is needed, the others are more for convenience.

To document component interfaces I've copied and cleaned the code for exported properties. It was the easiest solution available and I'm sure you Svelte programmers will understand it. I've also included context setting to document generic slotted component interface.

### &lt;SVG&gt;

```js
import { SVG } from 'p45'
```

SVG wraps the `<svg>` element applying the standard attributes, some default styling, and setting up the viewBox using the grid length.

SVG is immutable. This means your can create a single instance and share it. Furthermore, the SVG component also sets context for the _grid_, _title_, and _description_ properties so you don't need to pass a grid instance into your own SVG sub components.

_title_ and _description_ are optional and can alternatively be passed as slotted content using `<title>` and `<description>` respectively.

```js
export let grid // = P45Grid
export let title = undefined
export let description = undefined

setContext('grid', grid)
setContext('title', title)
setContext('description', description)
```

Boilerplate for a new SVG Svelte component:

```svelte
<script>
	import { P45Grid, SVG } from 'p45'
	const grid = new P45Grid(17) // 17x17 grid
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

---

### &lt;Arc&gt;

```js
import { Arc } from 'p45'
```

Arc uses the `<path>` element with the `M` and `A` commands to draw an arc. It's intended for when you only need an arc by itself rather than as a larger shape. Use the `<Path>` component for anything more complex.

Arcs are easy enough to do without this component but it translates the _from_ and _to_ props for you. I also find the property names add readable.

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

---

### &lt;Circle&gt;

```js
import { Circle } from 'p45'
```

```js
export let origin = grid.center // = { x: 0, y: 0 }
export let radius = 4           // 1 <= radius <= 7
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

---

### &lt;Line&gt;

```js
import { Line } from 'p45'
```

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

---

### &lt;Path&gt;

```js
import { Path } from 'p45'
```

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

---

### &lt;Polygon&gt;

```js
import { Polygon } from 'p45'
```

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

---

### &lt;RegularPolygon&gt;

```js
import { RegularPolygon } from 'p45'
```

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

---

### &lt;Text&gt;

```js
import { Text } from 'p45'
```

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

---

### &lt;Transform&gt;

```js
import { Transform } from 'p45'
```

The Transform component encapsulates slotted components with a `<g>` element and applies user transformations to it.

All properties are optional:

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

	// nodeGenerator generates all the nodes in the passed grid.
	//
	// If you're only creating a handful of simple icons then this is
	// unnecessary. But for a large set of icons referencing named fields on an
	// object, e.g. 'nodes.H8', might be more readable and writable.
	//
	// This utilty should only be used with smallish grids as the number of nodes
	// grows very quickly with size: O(n²), e.g. 5x5 => 25 but 10x10 => 100. This
	// is why the grid.node function creates new nodes rather than picking from
	// a prebuilt set.
	nodeGenerator(grid),

	// indexToAlpha converts the index i into its alphabetic counterpart.
	//
	// If i is greater than 25 a new significant letter is introduced,
	// e.g 0=A, 25=Z, 26=AA, 27=AB. It's essentially a traditional base 26
	// numbering system using English capital letters as symbols.
	indexToAlpha(i),
})
```
