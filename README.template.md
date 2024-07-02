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

The core class supplied to P45 components. It provides the context for P45 components such as grid size and certain named nodes.

It also provides functions for parsing command and transformation lists used by components such as `<Shape>` and `<Transform>`.

```js
class P45 {
  // Accepts size of the grid used as the unscaled width and height in pixels.
  // Size must be between 8 and 64.
  // Size must be divisible by 2.
  constructor(size=24) {
    this.size = size
    this.center // '12' for default size
    this.centerNode // 'M12' for default size
    this.topLeftNode
    this.topCenterNode
    this.topRightNode
    this.centerLeftNode
    this.centerCenterNode
    this.centerRightNode
    this.bottomLeftNode
    this.bottomCenterNode
    this.bottomRightNode
  }

  // Parses nodes such as `M12` into coordinates such as `{ x: 12, y: 12 }`.
  parseNode(node);

  // Converts coordinates such as `x=12` and `y=12` into nodes such as `M12`.
  nodeOf(x, y);

  // Converts the number `n` into it's base 26 alphabetic representation.
  numberToAlpha(n);

  // Parses a string or array of strings representing
  // draw commands for a single shape and returns a
  // string used in SVG paths like this `<path d={result} />`.
  parseDrawCommands(commands);

  // Parses a string or array of strings representing
  // transform commands for a single element and returns a
  // string used for the SVG transform attribute like this
  // `<path transform={result} />` or `<g transform={result} />`.
  parseTransformCommands(commands);
}
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

Illustration of the above drawing but with some minor modifications so it's visible on GitHub and other platforms.

![Approximate illustration of the last code snippet](static/simple-triangle.svg)

## Components

{{PLACEHOLDER}}
