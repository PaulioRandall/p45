<script>
	// See path.js for commands.

	export let d // = "" | [""]

	if (Array.isArray(d)) {
		d = d.join(' ')
	}
</script>

<path {...$$restProps} vector-effect="non-scaling-stroke" {d} />
