'use client'

import { usePathname } from 'next-intl/client'
import Link from 'next-intl/link'
import { ComponentProps } from 'react'

import clsx from 'clsx'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

export default function NavigationLink({ href, ...rest }: Props) {
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
