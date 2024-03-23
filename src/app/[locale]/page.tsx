import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import PageLayout from '@/components/pageLayout'

type Props = {
  params: { locale: string }
}

export default function IndexPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

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
