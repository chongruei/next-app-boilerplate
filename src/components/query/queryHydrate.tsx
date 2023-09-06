'use client'

import { HydrateProps, Hydrate as RQHydrate } from '@tanstack/react-query'

export const ReactQueryHydrate = (props: HydrateProps) => {
  return <RQHydrate {...props} />
}
