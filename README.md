![Made to be Plundered](https://img.shields.io/badge/Made%20to%20be%20Plundered-royalblue)
[![Latest version](https://img.shields.io/github/v/release/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)
[![Release date](https://img.shields.io/github/release-date/PaulioRandall/p45)](https://github.com/PaulioRandall/p45/releases)

# P45

Svelte library for programmatically crafting grid based SVGs.

Throughout this README I've used example based axiomatic definitions. My hoped for outcome is to strike a nice balance between concise communication of concepts and the precision needed for effective use of the library. I do hope it does not confuse.

**Intentions**

Grid based diagramming aims to improve design speed, consistency, and experience by constraining where users can draw. **I like to think of it as trading-off freedom of expression for speed of expression.**

A little while back I built a rather rough prototype tool [(SVG Icon Maker)](https://skepticalgoose.com/treasury/prototype-svg-maker) for crafting SVG icons on the theme of grid based diagramming. I'm finding the existing tools too fiddly and crafting SVGs by hand too tedious. This library is another, more refined, experiment.

> "Craftsmen engage themselves in complex tasks. The complexity of those tasks often gives a simplicity to their lives." - Edward de Bono (May he RIP)

As craftsmen we are inclined to precision. It's in our nature. But unlike painting fine art, meticulousness rarely pays off when drawing small web icons, especially SVGs.

**Trade-offs**

The implementation is rather simple and can easily be replicated by an experienced Svelte-JavaScript engineer in a day or two. I could have gone a lot further with crafting utility components and functions but it's much more economic to employ an inclusion-by-need rather than inclusion-by-foresight policy.

Those articulate in mental visualisation may be able to work out grid coordinates in their head with ease, but for most of us it's just too taxing. So one caveat of my approach is that you'll usually want a paper grid to hand as reference. Drawing the icons on paper (physical or digital) first is a lot easier. For simple shapes, mapping the coordinates to code shouldn't take more than a minute.

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
	import { Grid, SVG, Polygon, Path, J, M, L } from 'p45'

	// FYI: Grid instances are immutable.
	// You can share a single instance across
	// your whole project.
	const grid = new Grid(17) // 17x17 grid
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

## The Grid

```js
import { Grid } from 'p45'

// 2 < SIZE < 100
const g = new Grid(SIZE)
```

> TODO: Diagram of grid with annotated cell and annotated node as a visual reference for the text below.

The Grid is a simple JavaScript class with functions for generating nodes. Nodes are the points that make up a grid (or graph) as opposed to cells which are the square areas within a set of linked nodes.

Constructing a Grid instance requires a size:

- **an odd integer** so we always have a center node;
- **greater than 2** because anything smaller than _3x3_ has little use;
- **and less than 100** because I haven't coded that path yet.

### Properties

```js
// Note that this is mearly a user orientated
// representation of the algorithm and Grid
// properties, not the exact algorithm actually
// used.

import { Grid } from 'p45'

Grid.UNIT === 4
Grid.HALF === 2

Grid.idOf(col, row, offX = 0, offY = 0, shadow = false)
Grid.lenPxOf(col_or_row)
Grid.parseXY(x, y)
Grid.parseN(n)
Grid.checkSize(size)

new Grid(size) === {
	UNIT: Grid.UNIT,
	HALF: Grid.HALF,

	len: size,

	lastIdx: size - 1,
	centerIdx: this.lastIdx / 2,
	boundsIdx: {
		xMin: 0,
		xMax: this.lastIdx,
		yMin: 0,
		yMax: this.lastIdx,
	},

	lenPx: Grid.UNIT * this.lastIdx,
	centerPx: Grid.HALF * this.lastIdx,
	boundsPx: {
		xMin: 0,
		xMax: this.lenPx,
		yMin: 0,
		yMax: this.lenPx,
	},

	center: this.node(this.centerIdx, this.centerIdx),

	idOf(...) === Grid.idOf(...),
	lenPxOf(...) === Grid.lenPxOf(...),
	parseXY(...) === Grid.parseXY(...),
	parseN(...) === Grid.parseN(...),
	checkLen(...) === Grid.checkLen(...),

	isInBounds(v1 = 0, v2 = 0),

	node(col, row, offX = 0, offY = 0),
	shadowNode(col, row, offX = 0, offY = 0),

	n(...) === this.node(...),
	sn(...) === this.shadowNode(...),
}
```

#### `Grid.UNIT` & `Grid.HALF`

The distance between each node is fixed as _4_ and defined by `Grid.UNIT`. All calculations are performed from this such that:

```js
import { Grid } from 'p45'

;(Grid.UNIT === g.UNIT) === 4
;(Grid.HALF === g.HALF) === 2

const g = new Grid(9)

g.len === 9
g.lenPx === Grid.UNIT * 9

;((top__left === g.node(0, 0)) === { x: 0 * 4, y: 0 * 4 }) === { x: 0, y: 0 }
;((top_right === g.node(8, 0)) === { x: 8 * 4, y: 0 * 4 }) === { x: 32, y: 0 }
;((bot__left === g.node(0, 8)) === { x: 0 * 4, y: 8 * 4 }) === { x: 0, y: 32 }
;((bot_right === g.node(8, 8)) === { x: 8 * 4, y: 8 * 4 }) === { x: 32, y: 32 }
```

#### `Grid.idOf`

Returns a unique ID for every combination of inputs which is designed to be easily parsed. Defining the format as an axiomatic example:

```js
// Numbers are always signed and padded with zeros.
const id = Grid.idOf(2, 4, 5, -5) === 'COL_+002_+005_ROW_+004_-005'

id.split('_') === [
	0: 'COL'
	1: '+002' === 2 === // column number
	2: '+005' === 5 === // column offset in grid pixels
	3: 'ROW'
	4: '+005' === 2 === // row number
	5: '-005' === -5 === // row offset in grid pixels
]
```

> TODO: shadow flag

#### `Grid.lenPxOf`

Returns the length in grid pixels of a column or row number such that:

```js
;(Grid.lenOfPx(3) === Grid.UNIT * 3) === 12
```

#### `Grid.parseXY`

Parses an _x_ and _y_ numbers or strings into an object such that:

```js
Grid.parseXY(2, '3') === { x: 2, y: 3 }
Grid.parseXY(-2, '+3') === { x: -2, y: 3 }
Grid.parseXY(2, NaN) === null
Grid.parseXY(2, 'bad') === null
```

#### `Grid.parseN`

Parses a number or string into a number or `NaN`. Unlike `Number()`, `NaN` is always returned if the value cannot be converted:

```js
Grid.parseN(2) === 2
Grid.parseN(-2) === -2
Grid.parseN('2') === 2
Grid.parseN('bad') === NaN
Grid.parseN({} | [] | BigInt | Symbol) === NaN
Grid.parseN(NaN | null | undefined) === NaN
```

#### `Grid.checkSize`

Returns a string error message if the size argument is cannot be used to construct a Grid:

```js
// Note that this is mearly a user orientated
// representation of the result. The error
// messages may be reworded at anytime as a
// minor or patch release.
Grid.checkSize(3) === null
Grid.checkSize(99) === null
Grid.checkSize(2) === `Requires odd numbered grid size`
Grid.checkSize(1) === `Requires grid size >= 3`
Grid.checkSize(101) === `Requires grid size <= 99`
```

#### `Grid#node` & `Grid#n`

Visible nodes can be constructed by calling the `node` and `n` functions on a Grid instance. `n` being an alias of `node`. A new object is returned containing node properties in the form:

```js
// Note that this is mearly a user orientated
// representation of the algorithm and output,
// not the exact algorithm actually used.
grid.node(col, row, offX, offY) = {
	id: Grid.idOf(col, row, offX, offY),
	col: col,
	row: row,
	x: col * Grid.UNIT + offX,
	y: row * Grid.UNIT + offY,
	offX: offX,
	offY: offY,
	grid: grid,
}
```

Such that:

```js
import { Grid } from 'p45'

const g = new Grid(9)

;(top__left === g.node(0, 0)) ===
	{
		id: `COL_+000_+000_ROW_+000_+000`,
		col: 0,
		row: 0,
		x: 0,
		y: 0,
		offX: 0,
		offY: 0,
		grid: g,
	}

;(bot_right === g.node(8, 8)) ===
	{
		id: `COL_+008_+000_ROW_+008_+000`,
		col: 8,
		row: 8,
		x: 32, // Grid.UNIT * 8
		y: 32, // Grid.UNIT * 8
		offX: 0,
		offY: 0,
		grid: g,
	}
```

> TODO: Document each field and function.

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
