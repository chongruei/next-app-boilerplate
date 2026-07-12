import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'

/**
 * env.ts computes its exported `env` object once, at module evaluation time,
 * from `process.env`. To exercise different combinations of environment
 * variables per test we re-import the module with a unique query string on
 * every call, which forces Node's ESM loader to treat it as a brand new
 * module and re-evaluate it against the current `process.env`.
 */
let importCount = 0
const importEnv = () => import(`./env.ts?cachebust=${importCount++}`)

const ENV_KEYS = [
  'version',
  'NEXT_PUBLIC_MOCK',
  'NEXT_PUBLIC_ENV_NAME',
  'ANALYZE',
  'MOCK',
  'ENV_NAME',
  'NEXT_PUBLIC_ANALYZE'
] as const

const originalEnv: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>> = {}

before(() => {
  for (const key of ENV_KEYS) originalEnv[key] = process.env[key]
})

after(() => {
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key]
    else process.env[key] = originalEnv[key]
  }
})

const clearEnvKeys = () => {
  for (const key of ENV_KEYS) delete process.env[key]
}

test('env.MOCK falls back to "false" when NEXT_PUBLIC_MOCK is not set', async () => {
  clearEnvKeys()

  const { env } = await importEnv()

  assert.equal(env.MOCK, 'false')
})

test('env.MOCK reads its value from NEXT_PUBLIC_MOCK', async () => {
  clearEnvKeys()
  process.env.NEXT_PUBLIC_MOCK = 'true'

  const { env } = await importEnv()

  assert.equal(env.MOCK, 'true')
})

test('env.MOCK ignores the legacy MOCK variable', async () => {
  clearEnvKeys()
  process.env.MOCK = 'true'

  const { env } = await importEnv()

  assert.equal(env.MOCK, 'false')
})

test('env.ENV_NAME falls back to an empty string when NEXT_PUBLIC_ENV_NAME is not set', async () => {
  clearEnvKeys()

  const { env } = await importEnv()

  assert.equal(env.ENV_NAME, '')
})

test('env.ENV_NAME reads its value from NEXT_PUBLIC_ENV_NAME', async () => {
  clearEnvKeys()
  process.env.NEXT_PUBLIC_ENV_NAME = 'stage'

  const { env } = await importEnv()

  assert.equal(env.ENV_NAME, 'stage')
})

test('env.ENV_NAME ignores the legacy ENV_NAME variable', async () => {
  clearEnvKeys()
  process.env.ENV_NAME = 'prod'

  const { env } = await importEnv()

  assert.equal(env.ENV_NAME, '')
})

test('env.ANALYZE falls back to "false" when ANALYZE is not set', async () => {
  clearEnvKeys()

  const { env } = await importEnv()

  assert.equal(env.ANALYZE, 'false')
})

test('env.ANALYZE reads its value from ANALYZE', async () => {
  clearEnvKeys()
  process.env.ANALYZE = 'true'

  const { env } = await importEnv()

  assert.equal(env.ANALYZE, 'true')
})

test('env.ANALYZE ignores the legacy NEXT_PUBLIC_ANALYZE variable', async () => {
  clearEnvKeys()
  process.env.NEXT_PUBLIC_ANALYZE = 'true'

  const { env } = await importEnv()

  assert.equal(env.ANALYZE, 'false')
})

test('env exposes the expected shape when every variable is set at once', async () => {
  clearEnvKeys()
  process.env.NEXT_PUBLIC_MOCK = 'true'
  process.env.NEXT_PUBLIC_ENV_NAME = 'local'
  process.env.ANALYZE = 'true'

  const { env } = await importEnv()

  assert.deepEqual(env, {
    VERSION: '',
    MOCK: 'true',
    ENV_NAME: 'local',
    ANALYZE: 'true'
  })
})

test('env exposes only the default values when no relevant variables are set', async () => {
  clearEnvKeys()

  const { env } = await importEnv()

  assert.deepEqual(env, {
    VERSION: '',
    MOCK: 'false',
    ENV_NAME: '',
    ANALYZE: 'false'
  })
})
