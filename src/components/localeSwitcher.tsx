'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/client'
import { ChangeEvent, useTransition } from 'react'

import clsx from 'clsx'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <label
      className={clsx(
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{t('label')}</p>
      <select
        className="inline-flex max-w-[6rem] appearance-none bg-transparent py-3 pl-2 pr-6"
        data-testid="locale-switcher-select"
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {['en', 'zh-CN', 'zh-TW'].map(cur => (
          <option key={cur} data-testid={`locale-switcher-select-${cur}`} value={cur}>
            {t(`locale.${cur}`)}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  )
}
