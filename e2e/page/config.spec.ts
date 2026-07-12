import { expect, test } from '@playwright/test'

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
    await expect(page.getByTestId('env-json-values')).toHaveText(
      '{ "VERSION": "1.12.0", "MOCK": "true", "ENV_NAME": "local", "ANALYZE": "false" }'
    )
  })
})
