export default (p45) => {
	const points = []

	for (let x = 0; x < p45.size + 1; x++) {
		for (let y = 0; y < p45.size + 1; y++) {
			points.push({
				x,
				y,
				center: {
					x: x + 1,
					y: y + 1,
				},
				topLeft: {
					x: x + 0.5,
					y: y + 0.5,
				},
				node: p45.nodeOf(x, y),
			})
		}
	}

	return points
}
