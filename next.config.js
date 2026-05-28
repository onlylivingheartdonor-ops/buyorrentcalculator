/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'buyorrentcalculator.com' }],
        destination: 'https://www.buyorrentcalculator.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
