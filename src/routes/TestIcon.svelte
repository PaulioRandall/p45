<script>
	import P45 from '$lib/P45'
	import Icon from '$lib/Icon.svelte'

	export let p45 = new P45(24)
</script>

<div class="icon" {...$$restProps}>
	<Icon {p45}>
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
