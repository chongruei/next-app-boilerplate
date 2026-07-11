import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import PageLayout from '@/components/pageLayout'

type Props = {
  params: Promise<{ locale: string }>
}

export const dynamic = 'force-static'

export default function ConfigPage(props: Props) {
  const params = use(props.params)

  const { locale } = params

  setRequestLocale(locale)

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
