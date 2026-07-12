type ComputeEnvInput = {
  version: string | undefined
  mock: string | undefined
  envName: string | undefined
  analyze: string | undefined
}

/**
 * Takes the raw values as explicit params, rather than reading
 * `process.env` internally, so the literal `process.env.<KEY>`
 * expressions stay at the call site below — Next.js's `env` config in
 * next.config.js statically replaces those exact literal expressions
 * at build time, and that replacement only fires when the literal
 * pattern appears in the source (it can't see through a function
 * parameter named e.g. `processEnv.version`).
 */
export const computeEnv = ({ version, mock, envName, analyze }: ComputeEnvInput) => ({
  VERSION: version || '',
  MOCK: mock || 'false',
  ENV_NAME: envName || '',
  ANALYZE: analyze || 'false'
})

export const deriveModeFlags = (envName: string) => {
  const isLocal = envName === 'local'
  const isDev = envName === 'dev'
  const isStage = envName === 'stage'
  const isDevMode = !(envName === 'stage' || envName === 'prod')
  const isProdMode = !isDevMode

  return { isLocal, isDev, isStage, isDevMode, isProdMode }
}

export const env = computeEnv({
  version: process.env.version,
  mock: process.env.NEXT_PUBLIC_MOCK,
  envName: process.env.NEXT_PUBLIC_ENV_NAME,
  analyze: process.env.ANALYZE
})

const modeFlags = deriveModeFlags(env.ENV_NAME)

export const isLocal = modeFlags.isLocal

export const isDev = modeFlags.isDev

export const isStage = modeFlags.isStage

export const isDevMode = modeFlags.isDevMode

export const isProdMode = modeFlags.isProdMode
