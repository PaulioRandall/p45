import adapter from '@sveltejs/adapter-auto'
import path from 'path'

export default {
	kit: {
		adapter: adapter(),
		alias: {
			p46: path.resolve('./src/p46'),
		},
	},
}
