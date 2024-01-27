'use client'

import { HydrationBoundary, HydrationBoundaryProps } from '@tanstack/react-query'

export const ReactQueryHydrate = (props: HydrationBoundaryProps) => {
  return <HydrationBoundary {...props} />
}
