import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import ExternalLink from './externalLink'

type Props = {
  children?: ReactNode
  showFooter?: boolean
  title: ReactNode
}

export default function PageLayout({ title, showFooter = true, children }: Props) {
  const t = useTranslations('PageLayout')

  return (
    <div className="relative flex grow flex-col bg-slate-850 py-12 md:py-36">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1 h-[20500px] w-[20500px] -translate-x-[47.5%] rounded-full bg-gradient-to-b from-slate-900 via-cyan-500" />
      </div>
      <div className="container relative flex grow flex-col px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <div className="mt-6 text-gray-400 md:text-lg">{children}</div>
        {showFooter ? (
          <div className="mt-auto grid grid-cols-1 gap-4 pt-10 md:grid-cols-2 md:pt-20 lg:gap-12">
            <ExternalLink
              description={t('links.docs.description')}
              href={t('links.docs.href')}
              title={t('links.docs.title')}
            />
            <ExternalLink
              description={t('links.source.description')}
              href={t('links.source.href')}
              title={t('links.source.title')}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
