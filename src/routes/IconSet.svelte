<script>
	export let title = '¯\\_(ツ)_/¯'
</script>

<section class="icon-set">
	<h1>{title}</h1>
	<div class="icons">
		<slot />
	</div>
</section>

<style>
	.icon-set {
		display: flex;
		flex-direction: column;
	}

	.icons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
