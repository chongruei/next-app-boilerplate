import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import PageLayout from '@/components/pageLayout'

type Props = {
  params: { locale: string }
}

export default function ConfigPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

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
