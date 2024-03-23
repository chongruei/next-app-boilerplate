import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { dehydrate } from '@tanstack/react-query'

import { ReactQueryHydrate } from '@/components/query/queryHydrate'

import getQueryClient from '@/utils/queryClient'

import { getPosts } from '@/services/postServices'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props) {
  try {
    const t = await getTranslations({ locale })

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
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialPageParam: 1
  })
  const dehydratedState = dehydrate(queryClient)

  return <ReactQueryHydrate state={dehydratedState}>{children}</ReactQueryHydrate>
}
