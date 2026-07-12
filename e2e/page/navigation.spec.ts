import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/en')
})

test.describe('Navigation links', () => {
  test('render clean locale-prefixed hrefs without double slashes', async ({ page }) => {
    const hrefs = await page
      .locator('nav a')
      .evaluateAll(links => links.map(a => a.getAttribute('href')))

    expect(hrefs.length).toBeGreaterThan(0)

    // Regression: hrefs used to be built as `/en//about` (double slash),
    // which Next.js served via an extra 308 redirect on every click.
    for (const href of hrefs) {
      expect(href).toBeTruthy()
      expect(href!.includes('//')).toBe(false)
    }

    expect(hrefs).toEqual(expect.arrayContaining(['/en', '/en/about', '/en/config', '/en/query']))
  })

  test('clicking a nav link lands directly on the target URL', async ({ page }) => {
    await page.locator('nav a[href="/en/about"]').click()
    await expect(page).toHaveURL('http://localhost:3000/en/about')
  })

  test('marks exactly the current page as active via aria-current', async ({ page }) => {
    const activeLinks = page.locator('nav a[aria-current="page"]')

    await expect(activeLinks).toHaveCount(1)
    await expect(activeLinks).toHaveAttribute('href', '/en')
  })
})
