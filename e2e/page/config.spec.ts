import { expect, test } from '@playwright/test'

import packageJson from '../../package.json'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/config')
})

test.describe('Config Page', () => {
  test('should display the title and description in English', async ({ page }) => {
    const pageTitle = await page.innerText('h1')
    expect(pageTitle).toBe('Environment variables')

    await expect(page.getByTestId('description')).toHaveText(
      'This is a environment variables page.'
    )

    // ENV_NAME and MOCK are injected via the webServer env in
    // playwright.config.ts. Before the env.ts fix these read the wrong
    // (unprefixed) process.env keys and always came back "" / "false".
    // VERSION is read from package.json instead of hardcoded so this
    // doesn't break on every version bump.
    const envText = await page.getByTestId('env-json-values').innerText()
    expect(JSON.parse(envText)).toEqual({
      VERSION: packageJson.version,
      MOCK: 'true',
      ENV_NAME: 'local',
      ANALYZE: 'false'
    })
  })
})
