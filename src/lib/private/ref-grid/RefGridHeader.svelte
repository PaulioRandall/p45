<script>
	import RefGridControls from './RefGridControls.svelte'
	import RefGridInfo from './RefGridInfo.svelte'

	export let selected
	export let pointsEnabled
	export let guidelinesEnabled
	export let targetEnabled
	export let axisEnabled
</script>

<div class="p45-ref-grid-header">
	<div class="p45-ref-grid-header-row">
		<RefGridControls
			bind:pointsEnabled
			bind:guidelinesEnabled
			bind:targetEnabled
			bind:axisEnabled />
	</div>
	<div class="p45-ref-grid-header-row">
		<RefGridInfo {selected} />
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
