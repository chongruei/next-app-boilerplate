import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  computeEnv,
  deriveModeFlags,
  env,
  isDev,
  isDevMode,
  isLocal,
  isProdMode,
  isStage
} from './env.ts'

const undefinedInput = {
  version: undefined,
  mock: undefined,
  envName: undefined,
  analyze: undefined
}

test('computeEnv.VERSION falls back to "" when version is undefined', () => {
  const env = computeEnv(undefinedInput)

  assert.equal(env.VERSION, '')
})

test('computeEnv.VERSION passes through its given value', () => {
  const env = computeEnv({ ...undefinedInput, version: '1.2.3' })

  assert.equal(env.VERSION, '1.2.3')
})

test('computeEnv.MOCK falls back to "false" when mock is undefined', () => {
  const env = computeEnv(undefinedInput)

  assert.equal(env.MOCK, 'false')
})

test('computeEnv.MOCK passes through its given value', () => {
  const env = computeEnv({ ...undefinedInput, mock: 'true' })

  assert.equal(env.MOCK, 'true')
})

test('computeEnv.ENV_NAME falls back to "" when envName is undefined', () => {
  const env = computeEnv(undefinedInput)

  assert.equal(env.ENV_NAME, '')
})

test('computeEnv.ENV_NAME passes through its given value', () => {
  const env = computeEnv({ ...undefinedInput, envName: 'stage' })

  assert.equal(env.ENV_NAME, 'stage')
})

test('computeEnv.ANALYZE falls back to "false" when analyze is undefined', () => {
  const env = computeEnv(undefinedInput)

  assert.equal(env.ANALYZE, 'false')
})

test('computeEnv.ANALYZE passes through its given value', () => {
  const env = computeEnv({ ...undefinedInput, analyze: 'true' })

  assert.equal(env.ANALYZE, 'true')
})

test('computeEnv exposes the expected shape when every variable is set at once', () => {
  const env = computeEnv({
    version: '1.2.3',
    mock: 'true',
    envName: 'local',
    analyze: 'true'
  })

  assert.deepEqual(env, {
    VERSION: '1.2.3',
    MOCK: 'true',
    ENV_NAME: 'local',
    ANALYZE: 'true'
  })
})

test('computeEnv exposes only the default values when no relevant variables are set', () => {
  const env = computeEnv(undefinedInput)

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

test('the module-level env/mode exports are actually wired to computeEnv/deriveModeFlags', () => {
  assert.deepEqual(
    env,
    computeEnv({
      version: process.env.version,
      mock: process.env.NEXT_PUBLIC_MOCK,
      envName: process.env.NEXT_PUBLIC_ENV_NAME,
      analyze: process.env.ANALYZE
    })
  )

  assert.deepEqual(
    { isLocal, isDev, isStage, isDevMode, isProdMode },
    deriveModeFlags(env.ENV_NAME)
  )
})
