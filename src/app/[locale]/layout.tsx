import { NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ViewTransitions } from 'next-view-transitions'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import clsx from 'clsx'

import Navigation from '@/components/navigation'
import QueryProvider from '@/components/query/queryProvider'

import { locales } from '@/config'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations({ locale, namespace: 'LocaleLayout' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function LocaleLayout(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  return (
    <ViewTransitions>
      <html className="h-full" lang={locale}>
        <body className={clsx(inter.className, 'flex h-full flex-col')}>
          <NextIntlClientProvider>
            <QueryProvider>
              <Navigation />
              {children}
            </QueryProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
