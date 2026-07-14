'use client'

import { useLocale } from 'next-intl'
import { Link as TransitionLink } from 'next-view-transitions'
import { ComponentProps } from 'react'

import clsx from 'clsx'

import { Link, usePathname } from '@/navigation'

export default function NavigationLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const pathname = usePathname()
  const locale = useLocale()
  const isActive = pathname === href

  return (
    <TransitionLink
      aria-current={isActive ? 'page' : undefined}
      href={href === '/' ? `/${locale}` : `/${locale}${href}`}
      prefetch={false}
      className={clsx(
        'inline-block px-2 py-3 transition-colors',
        isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
      )}
      {...rest}
    />
  )
}
