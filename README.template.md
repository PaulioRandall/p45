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

{{PLACEHOLDER}}
