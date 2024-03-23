import { useLocale, useTranslations } from 'next-intl'

import { locales } from '@/config'

import LocaleSwitcherSelect from './localeSwitcherSelect'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {locales.map(cur => (
        <option key={cur} data-testid={`locale-switcher-select-${cur}`} value={cur}>
          {t(`locale.${cur}`)}
        </option>
      ))}
    </LocaleSwitcherSelect>
  )
}
