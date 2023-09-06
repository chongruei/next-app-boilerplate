'use client'

import { useTranslations } from 'next-intl'

import PageLayout from '@/components/pageLayout'
import { Posts } from '@/components/posts/posts'

export default function QueryPage() {
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
