'use client'

import React, { ReactNode, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { queryClientOptions } from '@/utils/queryClient'

interface Props {
  children: ReactNode
}

const QueryProviders = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions))

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProviders
