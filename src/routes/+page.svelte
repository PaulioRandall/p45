<script>
	import IconSet from './IconSet.svelte'
	import TestIcon from './TestIcon.svelte'

	import Circle from '$lib/Circle.svelte'
	import Shape from '$lib/Shape.svelte'
	import RegularPolygon from '$lib/RegularPolygon.svelte'
	import Transform from '$lib/Transform.svelte'
</script>

<main>
	<IconSet title="Shape">
		<TestIcon title="Default">
			<Shape />
		</TestIcon>
		<TestIcon title="Diagonal line">
			<Shape
				commands="
				move to C2
				line to W22
			" />
		</TestIcon>
		<TestIcon title="Stick bird">
			<Shape
				commands="
				move to D14
				line to H6
				line to M18
				line to R6
				line to V14
			" />
		</TestIcon>
		<TestIcon title="Square">
			<Shape
				commands="
				move to C2
				line to W2
				line to W22
				line to C22
				close
			" />
		</TestIcon>
		<TestIcon title="Lemon">
			<Shape
				commands="
				move to D3
				line to M3
				curve to V12 with slope V3
				line to V21
				line to M21
				curve to D12 with slope D21
				close
			" />
		</TestIcon>
		<TestIcon title="Horns">
			<Shape
				commands="
				move to D14
				curve to H6 with slopes D6 and H2
				curve to M18 with slope J18
				curve to R6 with slope R10
				curve to V14 with slope V6
				curve to start with slopes V24 and D24
				close
			" />
		</TestIcon>
	</IconSet>

	<IconSet title="Circle">
		<TestIcon title="Default">
			<Circle />
		</TestIcon>
		<TestIcon title="Cooking Hobs">
			<Circle origin="G6" radius="5" />
			<Circle origin="S6" radius="5" />
			<Circle origin="S18" radius="5" />
			<Circle origin="G18" radius="5" />
		</TestIcon>
		<TestIcon title="Offside">
			<Circle origin="X12" radius="12" />
		</TestIcon>
	</IconSet>

	<IconSet title="Regular Polygon">
		<TestIcon title="default">
			<RegularPolygon />
		</TestIcon>
		<TestIcon title="origin='M14' sides='3' radius='8' rotate='180'">
			<RegularPolygon origin="M14" sides="3" radius="8" rotate="180" />
		</TestIcon>
		<TestIcon title="origin='M12' sides='4' radius='8' rotate='-30'">
			<RegularPolygon origin="M12" sides="4" radius="8" rotate="-30" />
		</TestIcon>
		<TestIcon title="origin='M12' sides='12' radius='9'">
			<RegularPolygon origin="M12" sides="12" radius="9" />
		</TestIcon>
	</IconSet>

	<IconSet title="Transform">
		<TestIcon title="origin='M12' flipX flipY">
			<Transform origin="M12" flipX flipY>
				<Shape />
			</Transform>
		</TestIcon>

		<TestIcon title="origin='M12' scaleX='0.5' scaleY='1.5'">
			<Transform origin="M12" scaleX="0.5" scaleY="1.5">
				<Shape
					commands="
					move to H7
					line to R7
					line to R17
					line to H17
					close" />
			</Transform>
		</TestIcon>

		<TestIcon title="origin='M12' skewX='45' skewY='-25'">
			<Transform origin="M12" skewX="45" skewY="-25">
				<Shape
					commands="
					move to H7
					line to R7
					line to R17
					line to H17
					close" />
			</Transform>
		</TestIcon>

		<TestIcon title="origin='M12' moveX='2' moveY='4'">
			<Transform origin="M12" moveX="2" moveY="4">
				<Shape />
			</Transform>
		</TestIcon>

		<TestIcon title="origin='M12' rotate='21'">
			<Transform origin="M12" rotate="21">
				<Shape
					commands="
					move to H7
					line to R7
					line to R17
					line to H17
					close" />
			</Transform>
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
