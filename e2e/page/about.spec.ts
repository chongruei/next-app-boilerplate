import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/about')
})

test.describe('About Page', () => {
  test('should display the title and description in English', async ({ page }) => {
    const pageTitle = await page.innerText('h1')
    expect(pageTitle).toBe('About')

    await expect(page.getByTestId('description')).toHaveText(
      "The routing is internationalized too.If you're using the default language English, you'll see /about in the browser address bar on this page.If you change the locale to Chinese, the URL is prefixed with the locale (/zh-TW/about)."
    )
  })
})
