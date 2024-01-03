<script>
	// See path.js for commands.

	export let d // = "" | [""]

	if (Array.isArray(d)) {
		d = d.join(' ')
	}
</script>

<path vector-effect="non-scaling-stroke" {...$$restProps} {d} />
