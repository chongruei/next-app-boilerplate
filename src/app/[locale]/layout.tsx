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
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  return (
    <ViewTransitions>
      <html className="h-full" lang={locale}>
        <body className={clsx(inter.className, 'flex h-full flex-col')}>
          <QueryProvider>
            <Navigation />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
