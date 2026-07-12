import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import PageLayout from '@/components/pageLayout'
import { Posts } from '@/components/posts/posts'

type Props = {
  params: Promise<{ locale: string }>
}

export const dynamic = 'force-static'
export const revalidate = 600

export default function QueryPage(props: Props) {
  const params = use(props.params)

  const { locale } = params

  setRequestLocale(locale)

  const t = useTranslations('QueryPage')

  return (
    <PageLayout showFooter={false} title={t('title')}>
      <div className="max-w-[460px]" data-testid="description">
        {t('description')}
      </div>
      <Posts />
    </PageLayout>
  )
}
