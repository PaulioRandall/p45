<script>
	import IconSet from './IconSet.svelte'
	import TestIcon from './TestIcon.svelte'

	import Circle from '$lib/Circle.svelte'
	import Line from '$lib/Line.svelte'
</script>

<main>
	<IconSet title="Line">
		<TestIcon>
			<Line />
		</TestIcon>
		<TestIcon>
			<Line from="M5" to="M19" />
			<Line from="F12" to="T12" stroke="grey" />
		</TestIcon>
	</IconSet>

	<IconSet title="Circle">
		<TestIcon>
			<Circle />
		</TestIcon>
		<TestIcon>
			<Circle o="M12" r="6" />
		</TestIcon>
	</IconSet>
</main>

<style>
	main {
		width: 100dvw;
		min-height: 100dvh;
		padding: 2rem;

		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
