import { Pathnames } from 'next-intl/routing'

export const locales = ['en', 'zh-TW', 'zh-CN'] as const
export type localeType = 'en' | 'zh-TW' | 'zh-CN'

export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    'zh-TW': '/about',
    'zh-CN': '/about'
  },
  '/config': {
    en: '/config',
    'zh-TW': '/config',
    'zh-CN': '/config'
  },
  '/query': {
    en: '/query',
    'zh-TW': '/query',
    'zh-CN': '/query'
  }
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
