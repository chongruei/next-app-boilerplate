'use client'

import { useTranslations } from 'next-intl'

import PageLayout from '@/components/pageLayout'

export default function ConfigPage() {
  const t = useTranslations('AboutPage')

  return (
    <PageLayout title={t('title')}>
      <div className="max-w-[460px]" data-testid="description">
        {t.rich('description', {
          p: chunks => <p>{chunks}</p>,
          code: chunks => <code className="font-mono text-white">{chunks}</code>
        })}
      </div>
    </PageLayout>
  )
}
