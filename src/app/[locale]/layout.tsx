import { NextIntlClientProvider, createTranslator } from 'next-intl'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import clsx from 'clsx'

import Navigation from '@/components/navigation'
import QueryProvider from '@/components/query/queryProvider'

import { getMessages } from '@/utils/i18n'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return ['en', 'zh-CN', 'zh-TW'].map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: Props) {
  try {
    const messages = await getMessages(locale)
    // You can use the core (non-React) APIs when you have to use next-intl
    // outside of components. Potentially this will be simplified in the future
    // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
    const t = createTranslator({ locale, messages })

    return {
      title: t('LocaleLayout.title'),
      description: t('LocaleLayout.description')
    }
  } catch {
    notFound()
  }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages(locale)

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx(inter.className, 'flex h-full flex-col')}>
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navigation />
            {children}
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
