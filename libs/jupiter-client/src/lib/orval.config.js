module.exports = {
	'jupiter-client': {
		input: './openapi.yaml',
		output: {
			target: './client.ts',
			override: {
				mutator: {
					path: './axios.ts',
					name: 'customInstance',
				},
			},
		},
	},
}
