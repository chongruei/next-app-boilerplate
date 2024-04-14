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

    await expect(page.getByTestId('env-json-values')).toHaveText(
      '{ "VERSION": "1.5.0", "MOCK": "false", "ENV_NAME": "", "ANALYZE": "false" }'
    )
  })
})
