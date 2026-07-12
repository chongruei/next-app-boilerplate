import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import PageLayout from '@/components/pageLayout'

export const dynamic = 'force-static'

type Props = {
  params: Promise<{ locale: string }>
}

export default function IndexPage(props: Props) {
  const params = use(props.params)

  const { locale } = params

  setRequestLocale(locale)

  const t = useTranslations('IndexPage')

  return (
    <PageLayout title={t('title')}>
      <p className="max-w-[590px]" data-testid="description">
        {t.rich('description', {
          code: chunks => <code className="font-mono text-white">{chunks}</code>
        })}
      </p>
    </PageLayout>
  )
}
