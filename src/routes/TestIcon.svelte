<script>
	import Grid from '$lib/Grid'
	import Icon from '$lib/Icon.svelte'

	export let grid = new Grid(24)
</script>

<div class="icon">
	<Icon {grid}>
		<slot />
	</Icon>
</div>

<style>
	.icon {
		width: 192px;
		height: 192px;
		border: 2px solid lightblue;
	}
</style>
