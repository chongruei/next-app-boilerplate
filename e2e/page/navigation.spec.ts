import { expect, test } from '@playwright/test'

test.describe('Navigation links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en')
  })

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

  test('prefixes the home link with the locale without a trailing double slash', async ({
    page
  }) => {
    await expect(page.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute(
      'href',
      '/en'
    )
  })

  test('prefixes non-root links with the locale without an extra slash', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'About', exact: true })).toHaveAttribute(
      'href',
      '/en/about'
    )
    await expect(page.getByRole('link', { name: 'Config', exact: true })).toHaveAttribute(
      'href',
      '/en/config'
    )
    await expect(page.getByRole('link', { name: 'Query', exact: true })).toHaveAttribute(
      'href',
      '/en/query'
    )
  })

  test('prefixes links with a non-default locale correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/zh-TW')

    await expect(page.getByRole('link', { name: '首頁', exact: true })).toHaveAttribute(
      'href',
      '/zh-TW'
    )
    await expect(page.getByRole('link', { name: '關於', exact: true })).toHaveAttribute(
      'href',
      '/zh-TW/about'
    )
  })

  test('marks the link matching the current page with aria-current="page"', async ({ page }) => {
    await page.goto('http://localhost:3000/en/about')

    await expect(page.getByRole('link', { name: 'About', exact: true })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  test('does not set aria-current on links that do not match the current page', async ({
    page
  }) => {
    await page.goto('http://localhost:3000/en/about')

    await expect(page.getByRole('link', { name: 'Home', exact: true })).not.toHaveAttribute(
      'aria-current'
    )
    await expect(page.getByRole('link', { name: 'Config', exact: true })).not.toHaveAttribute(
      'aria-current'
    )
    await expect(page.getByRole('link', { name: 'Query', exact: true })).not.toHaveAttribute(
      'aria-current'
    )
  })

  test('marks the home link as active only when on the home page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute(
      'aria-current',
      'page'
    )

    await page.goto('http://localhost:3000/en/query')

    await expect(page.getByRole('link', { name: 'Home', exact: true })).not.toHaveAttribute(
      'aria-current'
    )
    await expect(page.getByRole('link', { name: 'Query', exact: true })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })
})
