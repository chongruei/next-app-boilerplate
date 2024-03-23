'use client'

import { ComponentProps } from 'react'

import clsx from 'clsx'

import type { AppPathnames } from '@/config'
import { Link, usePathname } from '@/navigation'

export default function NavigationLink<Pathname extends AppPathnames>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      aria-current={isActive}
      href={href}
      className={clsx(
        'inline-block px-2 py-3 transition-colors',
        isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
      )}
      {...rest}
    />
  )
}
