import { createTranslator } from 'next-intl'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { dehydrate } from '@tanstack/react-query'

import { ReactQueryHydrate } from '@/components/query/queryHydrate'

import { getMessages } from '@/utils/i18n'
import getQueryClient from '@/utils/queryClient'

import { getPosts } from '@/services/postServices'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props) {
  try {
    const messages = await getMessages(locale)
    // You can use the core (non-React) APIs when you have to use next-intl
    // outside of components. Potentially this will be simplified in the future
    // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
    const t = createTranslator({ locale, messages })

    return {
      title: t('QueryPage.title'),
      description: t('QueryPage.description')
    }
  } catch {
    notFound()
  }
}

export default async function QueryLayout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery(['posts'], getPosts)
  const dehydratedState = dehydrate(queryClient)

  return <ReactQueryHydrate state={dehydratedState}>{children}</ReactQueryHydrate>
}
