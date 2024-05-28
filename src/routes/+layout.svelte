<script>
	import './layout.css'
</script>

<div class="page">
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;

		overflow-x: hidden;

		width: 100%;
		max-width: 100%;
		min-height: 100vh;
	}

	.content {
		flex-grow: 1;

		width: 100%;
		max-width: 100%;
	}
</style>
