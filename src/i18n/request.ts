import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { routing } from '@/routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale

  // Validate that the incoming `locale` parameter is valid
  if (!hasLocale(routing.locales, requested)) notFound()

  let localeDir: string = requested

  if (localeDir === 'zh-TW') localeDir = 'zh_TW'
  if (localeDir === 'zh-CN') localeDir = 'zh_CN'

  return {
    locale: requested,
    messages: (await import(`../../locales/${localeDir}.json`)).default
  }
})
