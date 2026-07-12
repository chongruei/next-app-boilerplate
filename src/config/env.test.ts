import assert from 'node:assert/strict'
import { test } from 'node:test'

import { computeEnv, deriveModeFlags } from './env.ts'

test('computeEnv.MOCK falls back to "false" when NEXT_PUBLIC_MOCK is not set', () => {
  const env = computeEnv({})

  assert.equal(env.MOCK, 'false')
})

test('computeEnv.MOCK reads its value from NEXT_PUBLIC_MOCK', () => {
  const env = computeEnv({ NEXT_PUBLIC_MOCK: 'true' })

  assert.equal(env.MOCK, 'true')
})

test('computeEnv.MOCK ignores the legacy MOCK variable', () => {
  const env = computeEnv({ MOCK: 'true' })

  assert.equal(env.MOCK, 'false')
})

test('computeEnv.ENV_NAME falls back to an empty string when NEXT_PUBLIC_ENV_NAME is not set', () => {
  const env = computeEnv({})

  assert.equal(env.ENV_NAME, '')
})

test('computeEnv.ENV_NAME reads its value from NEXT_PUBLIC_ENV_NAME', () => {
  const env = computeEnv({ NEXT_PUBLIC_ENV_NAME: 'stage' })

  assert.equal(env.ENV_NAME, 'stage')
})

test('computeEnv.ENV_NAME ignores the legacy ENV_NAME variable', () => {
  const env = computeEnv({ ENV_NAME: 'prod' })

  assert.equal(env.ENV_NAME, '')
})

test('computeEnv.ANALYZE falls back to "false" when ANALYZE is not set', () => {
  const env = computeEnv({})

  assert.equal(env.ANALYZE, 'false')
})

test('computeEnv.ANALYZE reads its value from ANALYZE', () => {
  const env = computeEnv({ ANALYZE: 'true' })

  assert.equal(env.ANALYZE, 'true')
})

test('computeEnv.ANALYZE ignores the legacy NEXT_PUBLIC_ANALYZE variable', () => {
  const env = computeEnv({ NEXT_PUBLIC_ANALYZE: 'true' })

  assert.equal(env.ANALYZE, 'false')
})

test('computeEnv.VERSION reads its value from the lowercase version variable', () => {
  const env = computeEnv({ version: '1.2.3' })

  assert.equal(env.VERSION, '1.2.3')
})

test('computeEnv exposes the expected shape when every variable is set at once', () => {
  const env = computeEnv({
    version: '1.2.3',
    NEXT_PUBLIC_MOCK: 'true',
    NEXT_PUBLIC_ENV_NAME: 'local',
    ANALYZE: 'true'
  })

  assert.deepEqual(env, {
    VERSION: '1.2.3',
    MOCK: 'true',
    ENV_NAME: 'local',
    ANALYZE: 'true'
  })
})

test('computeEnv exposes only the default values when no relevant variables are set', () => {
  const env = computeEnv({})

  assert.deepEqual(env, {
    VERSION: '',
    MOCK: 'false',
    ENV_NAME: '',
    ANALYZE: 'false'
  })
})

test('deriveModeFlags("local") flags local mode only', () => {
  assert.deepEqual(deriveModeFlags('local'), {
    isLocal: true,
    isDev: false,
    isStage: false,
    isDevMode: true,
    isProdMode: false
  })
})

test('deriveModeFlags("dev") flags dev mode only', () => {
  assert.deepEqual(deriveModeFlags('dev'), {
    isLocal: false,
    isDev: true,
    isStage: false,
    isDevMode: true,
    isProdMode: false
  })
})

test('deriveModeFlags("stage") flags stage mode and prod-mode semantics', () => {
  assert.deepEqual(deriveModeFlags('stage'), {
    isLocal: false,
    isDev: false,
    isStage: true,
    isDevMode: false,
    isProdMode: true
  })
})

test('deriveModeFlags("prod") flags prod-mode semantics', () => {
  assert.deepEqual(deriveModeFlags('prod'), {
    isLocal: false,
    isDev: false,
    isStage: false,
    isDevMode: false,
    isProdMode: true
  })
})

test('deriveModeFlags("") defaults to dev mode with no named env matched', () => {
  assert.deepEqual(deriveModeFlags(''), {
    isLocal: false,
    isDev: false,
    isStage: false,
    isDevMode: true,
    isProdMode: false
  })
})
