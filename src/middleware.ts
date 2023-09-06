import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'zh-CN', 'zh-TW'],
  defaultLocale: 'en'
})

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
