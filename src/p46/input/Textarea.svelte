<script>
	export let value = []

	$: rows = value.split('\n').length
</script>

<textarea class="p46-textarea" {rows} bind:value />

<style>
	.p46-textarea {
		width: 100%;
		resize: vertical;
		padding: 1rem;
		font-size: 1rem;
		margin: 0;
	}
</style>
