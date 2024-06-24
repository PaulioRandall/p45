<script>
	import RefGridControls from './RefGridControls.svelte'
	import RefGridInfo from './RefGridInfo.svelte'
</script>

<div class="p45-ref-grid-header">
	<div class="p45-ref-grid-header-row">
		<RefGridControls />
	</div>
	<div class="p45-ref-grid-header-row">
		<RefGridInfo />
	</div>
</div>

<style>
	.p45-ref-grid-header {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		gap: 1rem;
		width: 100%;
	}

	.p45-ref-grid-header-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		gap: 1rem;
	}
</style>
