'use client'

import { useTranslations } from 'next-intl'

import PageLayout from '@/components/pageLayout'
import TodoList from '@/components/todoList'

import { env } from '@/config/env'

export default function ConfigPage() {
  const t = useTranslations('ConfigPage')

  return (
    <PageLayout showFooter={false} title={t('title')}>
      <div className="max-w-[460px]" data-testid="description">
        {t('description', { envName: `.env.${env.ENV_NAME}` })}
      </div>
      <code data-testid="env-json-values">{JSON.stringify(env, null, 2)}</code>
      <TodoList />
    </PageLayout>
  )
}
