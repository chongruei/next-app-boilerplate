const createNextIntlPlugin = require('next-intl/plugin')
const { version } = require('./package.json')
const withNextIntl = createNextIntlPlugin()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    version
  },
  output: 'standalone'
}

module.exports = withBundleAnalyzer(withNextIntl(nextConfig))
