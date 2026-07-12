import { defineRouting } from 'next-intl/routing'

import { localePrefix, locales, pathnames } from '@/config'

export const routing = defineRouting({
  defaultLocale: 'en',
  locales,
  localePrefix,
  pathnames
})
