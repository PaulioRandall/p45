<script>
	import IconSet from './IconSet.svelte'
	import TestIcon from './TestIcon.svelte'

	import Line from '$lib/Line.svelte'
	import Shape from '$lib/Shape.svelte'
	import Circle from '$lib/Circle.svelte'
	import Polygon from '$lib/Polygon.svelte'
	import RegularPolygon from '$lib/RegularPolygon.svelte'
	import Text from '$lib/Text.svelte'
	import Transform from '$lib/Transform.svelte'
</script>

<main>
	<IconSet title="Line">
		<TestIcon title="default">
			<Line />
		</TestIcon>
		<TestIcon title="Two lines">
			<Line points="I6,I18" />
			<Line points="Q6,Q18" />
		</TestIcon>
		<TestIcon title="points='D14,H6,M18,R6,V14'">
			<Line points="D14,H6,M18,R6,V14" />
		</TestIcon>
	</IconSet>

	<IconSet title="Circle">
		<TestIcon title="default">
			<Circle />
		</TestIcon>
		<TestIcon title="origin='M12' radius='6'">
			<Circle origin="M12" radius="6" />
		</TestIcon>
	</IconSet>

	<IconSet title="Polygon">
		<TestIcon title="default">
			<Polygon />
		</TestIcon>
		<TestIcon title="points='M4,T8,T16,M20,F16,F8'">
			<Polygon points="M4,T8,T16,M20,F16,F8" />
		</TestIcon>
		<TestIcon title="Lots of squares">
			<Polygon points="B1,X1,X23,B23" />
			<Polygon points="D3,V3,V21,D21" />
			<Polygon points="F5,T5,T19,F19" />
			<Polygon points="H7,R7,R17,H17" />
			<Polygon points="J9,P9,P15,J15" />
			<Polygon points="L11,N11,N13,L13" />
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

	<IconSet title="Shape">
		<TestIcon title="default">
			<Shape />
		</TestIcon>
		<TestIcon title="points='D3, M3 L, V12 Q V3, V21 L, M21 L, D12 Q D21'">
			<Shape points="D3, M3 L, V12 Q V3, V21 L, M21 L, D12 Q D21" />
		</TestIcon>
		<TestIcon title="points='D14, H6 C D6 H2, M18 S J18, R6 S R10, V14 S V6'">
			<Shape points="D14, H6 C D6 H2, M18 S J18, R6 S R10, V14 S V6" />
		</TestIcon>
	</IconSet>

	<IconSet title="Text">
		<TestIcon title="point='B14' font-size='8' textLength='22'">
			<Text point="B14" font-size="8" textLength="22">Hello</Text>
		</TestIcon>
	</IconSet>

	<IconSet title="Transform">
		<TestIcon title="origin='M12' flipX flipY">
			<Transform origin="M12" flipX flipY>
				<Polygon />
			</Transform>
		</TestIcon>

		<TestIcon title="origin='M12' scaleX='0.5' scaleY='1.5'">
			<Transform origin="M12" scaleX="0.5" scaleY="1.5">
				<Polygon points="H7,R7,R17,H17" />
			</Transform>
		</TestIcon>

		<TestIcon title="origin='M12' skewX='45' skewY='-25'">
			<Transform origin="M12" skewX="45" skewY="-25">
				<Polygon points="H7,R7,R17,H17" />
			</Transform>
		</TestIcon>

		<TestIcon title="origin='M12' moveX='2' moveY='4'">
			<Transform origin="M12" moveX="2" moveY="4">
				<Polygon />
			</Transform>
		</TestIcon>

		<TestIcon title="origin='M12' rotate='21'">
			<Transform origin="M12" rotate="21">
				<Polygon points="H7,R7,R17,H17" />
			</Transform>
		</TestIcon>
	</IconSet>

	<IconSet title="Transform Property Order">
		<TestIcon
			title="origin='M12' rotate='40' scaleX='0.6' scaleY='1.1' moveX='-6' moveY='-4'">
			<Transform
				origin="M12"
				rotate="40"
				scaleX="0.6"
				scaleY="1.1"
				moveX="-6"
				moveY="-4">
				<Polygon points="H7,R7,R17,H17" />
			</Transform>
		</TestIcon>

		<TestIcon
			title="origin='M12' moveX='-6' moveY='-4' rotate='40' scaleX='0.6' scaleY='1.1'">
			<Transform
				origin="M12"
				moveX="-6"
				moveY="-4"
				rotate="40"
				scaleX="0.6"
				scaleY="1.1">
				<Polygon points="H7,R7,R17,H17" />
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
