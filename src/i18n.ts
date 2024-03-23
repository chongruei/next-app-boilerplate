import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { locales } from '@/config'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as any)) notFound()

  let localeDir = locale

  if (localeDir === 'zh-TW') localeDir = 'zh_TW'
  if (localeDir === 'zh-CN') localeDir = 'zh_CN'

  return {
    messages: (await import(`../locales/${localeDir}.json`)).default
  }
})
