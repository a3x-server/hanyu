/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				port: '',
				pathname: '/v0/b/serverbkd-trifaxic-ts.appspot.com/o/**',
			},
			{
				protocol: 'https',
				hostname: 'http2.mlstatic.com',
			},
		],
	},
}

export default nextConfig
