type ProcessEnvLike = Record<string, string | undefined>

export const computeEnv = (processEnv: ProcessEnvLike) => ({
  VERSION: processEnv.version || '',
  MOCK: processEnv.NEXT_PUBLIC_MOCK || 'false',
  ENV_NAME: processEnv.NEXT_PUBLIC_ENV_NAME || '',
  ANALYZE: processEnv.ANALYZE || 'false'
})

export const deriveModeFlags = (envName: string) => {
  const isLocal = envName === 'local'
  const isDev = envName === 'dev'
  const isStage = envName === 'stage'
  const isDevMode = !(envName === 'stage' || envName === 'prod')
  const isProdMode = !isDevMode

  return { isLocal, isDev, isStage, isDevMode, isProdMode }
}

export const env = computeEnv(process.env)

const modeFlags = deriveModeFlags(env.ENV_NAME)

export const isLocal = modeFlags.isLocal

export const isDev = modeFlags.isDev

export const isStage = modeFlags.isStage

export const isDevMode = modeFlags.isDevMode

export const isProdMode = modeFlags.isProdMode
