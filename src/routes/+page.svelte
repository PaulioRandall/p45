<script>
	import IconSet from './IconSet.svelte'
	import TestIcon from './TestIcon.svelte'

	import Line from '$lib/Line.svelte'
	import Shape from '$lib/Shape.svelte'
	import Circle from '$lib/Circle.svelte'
	import Polygon from '$lib/Polygon.svelte'
	import RegularPolygon from '$lib/RegularPolygon.svelte'
	import Text from '$lib/Text.svelte'
</script>

<main>
	<IconSet title="Line">
		<TestIcon>
			<Line />
		</TestIcon>
		<TestIcon>
			<Line points="I6,I18" />
			<Line points="Q6,Q18" />
		</TestIcon>
		<TestIcon>
			<Line points="D14,H6,M18,R6,V14" />
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
			<Polygon points="M4,T8,T16,M20,F16,F8" />
		</TestIcon>
	</IconSet>

	<IconSet title="Regular Polygon">
		<TestIcon>
			<RegularPolygon />
		</TestIcon>
		<TestIcon>
			<RegularPolygon origin="M14" sides="3" radius="8" rotate="180" />
		</TestIcon>
		<TestIcon>
			<RegularPolygon origin="M12" sides="4" radius="8" rotate="-30" />
		</TestIcon>
		<TestIcon>
			<RegularPolygon origin="M12" sides="12" radius="9" />
		</TestIcon>
	</IconSet>

	<IconSet title="Shape">
		<TestIcon>
			<Shape />
		</TestIcon>
		<TestIcon>
			<Shape points="D3, M3 L, V12 Q V3, V21 L, M21 L, D12 Q D21" />
		</TestIcon>
		<TestIcon>
			<Shape points="D14, H6 C D6 H2, M18 S J18, R6 S R10, V14 S V6" />
		</TestIcon>
	</IconSet>

	<IconSet title="Text">
		<TestIcon>
			<Text point="B14" font-size="8" textLength="22">Hello</Text>
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
