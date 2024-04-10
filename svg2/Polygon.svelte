<script>
	export let points /* [
		{
			x: 0,
			y: 0,
		}
	] */

	const pointsToStrings = ({ x, y }) => `${x},${y}`
	$: _points = points.map(pointsToStrings).join(' ')
</script>

<polygon {...$$restProps} points={_points} />
