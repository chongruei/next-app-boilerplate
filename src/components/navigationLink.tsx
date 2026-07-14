'use client'

import { useLocale } from 'next-intl'
import NextLink from 'next/link'
import { ComponentProps } from 'react'

import clsx from 'clsx'

import { Link, usePathname } from '@/navigation'

export default function NavigationLink({
  href,
  // Defaults to false: the persistent nav links remount on every
  // locale switch, and Next.js re-fires each remounted Link's
  // automatic prefetch several times over during that transition
  // (measured: 17 requests for 4 links on a single locale switch).
  // Links whose destination has real async work worth prefetching
  // ahead of the click can opt back in explicitly (see Navigation.tsx).
  prefetch = false,
  ...rest
}: ComponentProps<typeof Link>) {
  const pathname = usePathname()
  const locale = useLocale()
  const isActive = pathname === href

  return (
    <NextLink
      {...rest}
      aria-current={isActive ? 'page' : undefined}
      href={href === '/' ? `/${locale}` : `/${locale}${href}`}
      prefetch={prefetch}
      className={clsx(
        'inline-block px-2 py-3 transition-colors',
        isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
      )}
    />
  )
}
