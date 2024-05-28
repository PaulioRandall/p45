import path from 'path'
import adapter from '@sveltejs/adapter-auto'

export default {
	kit: {
		adapter: adapter(),
		alias: {
			$routes: path.resolve('./src/routes'),
			p17: path.resolve('./src/lib'),
		},
	},
}
