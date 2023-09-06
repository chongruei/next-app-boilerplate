export const env = {
  VERSION: process.env.NEXT_PUBLIC_VERSION || '',
  ENV: process.env.NEXT_PUBLIC_ENV || '',
  MOCK: process.env.MOCK || 'false',
  ENV_NAME: process.env.NEXT_PUBLIC_ENV_NAME || '',
  ANALYZE: process.env.NEXT_PUBLIC_ANALYZE || 'false'
}

export const isLocal = env.ENV_NAME === 'local'

export const isDev = env.ENV_NAME === 'dev'

export const isStage = env.ENV_NAME === 'stage'

export const isDevMode = !(env.ENV_NAME === 'stage' || env.ENV_NAME === 'prod')

export const isProdMode = !isDevMode
