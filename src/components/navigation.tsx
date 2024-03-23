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
          <NavigationLink href="/query">{t('query')}</NavigationLink>
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  )
}
