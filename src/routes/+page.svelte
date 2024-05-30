<script>
	import IconSet from './IconSet.svelte'
	import TestIcon from './TestIcon.svelte'

	import Line from '$lib/Line.svelte'
	import Circle from '$lib/Circle.svelte'
	import Polygon from '$lib/Polygon.svelte'
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
			<Circle origin="M12" radius="6" />
		</TestIcon>
	</IconSet>

	<IconSet title="Polygon">
		<TestIcon>
			<Polygon />
		</TestIcon>
		<TestIcon>
			<Polygon points="M2, V7, V17, M22, D17, D7" />
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
