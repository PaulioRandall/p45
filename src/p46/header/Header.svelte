<script>
	import Controls from './Controls.svelte'
	import CoordInfo from './CoordInfo.svelte'

	export let selected
	export let pointsEnabled
	export let guidelinesEnabled
	export let targetEnabled
	export let axisEnabled
</script>

<div class="p46-header">
	<div class="p46-header-row">
		<Controls
			bind:pointsEnabled
			bind:guidelinesEnabled
			bind:targetEnabled
			bind:axisEnabled />
	</div>
	<div class="p46-header-row">
		<CoordInfo {selected} />
	</div>
</div>

<style>
	.p46-header {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		gap: 1rem;
		width: 100%;
	}

	.p46-header-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		gap: 1rem;
	}
</style>
