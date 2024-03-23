import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import PageLayout from '@/components/pageLayout'
import { Posts } from '@/components/posts/posts'

type Props = {
  params: { locale: string }
}

export default function QueryPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

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
