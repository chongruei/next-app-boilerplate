import { useTranslations } from 'next-intl'

import LocaleSwitcher from './localeSwitcher'
import NavigationLink from './navigationLink'

export default function Navigation() {
  const t = useTranslations('Navigation')

  return (
    <div className="bg-slate-850">
      <nav className="container flex justify-between px-2 py-2 text-white">
        <div>
          <NavigationLink href="/">{t('home')}</NavigationLink>
          <NavigationLink href="/about">{t('about')}</NavigationLink>
          <NavigationLink href="/config">{t('config')}</NavigationLink>
          {/* /query is the one link with real async data (a live API fetch,
              cached via ISR) — prefetching it means that content is usually
              already loaded by the time it's clicked, unlike the other pages
              which are trivial to fetch fresh anyway. */}
          <NavigationLink prefetch href="/query">
            {t('query')}
          </NavigationLink>
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  )
}
