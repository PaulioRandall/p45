export const toSvgPoint = ({ type, x, y, cp1x, cp1y, cp2x, cp2y }, i) => {
	if (i === 0) {
		return `M ${x},${y}`
	}

	if (type === 'N') {
		return `${x},${y}`
	}

	if (type === 'L') {
		return `L ${x},${y}`
	}

	if (type === 'T') {
		return `T ${x},${y}`
	}

	if (type === 'S') {
		return `S ${cp1x},${cp1y} ${x},${y}`
	}

	if (type === 'Q') {
		return `Q ${cp1x},${cp1y} ${x},${y}`
	}

	if (type === 'C') {
		return `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`
	}

	throw new Error(`[P45:Line] Unknown point type '${type}'`)
}
