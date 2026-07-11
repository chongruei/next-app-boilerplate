import { use } from "react";
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import PageLayout from '@/components/pageLayout'
import TodoList from '@/components/todoList'

import { env } from '@/config/env'

export const dynamic = 'force-static'

type Props = {
  params: Promise<{ locale: string }>
}

export default function ConfigPage(props: Props) {
  const params = use(props.params);

  const {
    locale
  } = params;

  setRequestLocale(locale)

  const t = useTranslations('ConfigPage')

  return (
    <PageLayout showFooter={false} title={t('title')}>
      <div className="max-w-[460px]" data-testid="description">
        {t('description')}
      </div>
      <code data-testid="env-json-values">{JSON.stringify(env, null, 2)}</code>
      <TodoList />
    </PageLayout>
  )
}
