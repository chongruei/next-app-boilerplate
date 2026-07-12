import { expect, test } from '@playwright/test'

test.describe('Navigation Links', () => {
  test('prefixes the home link with the locale without a trailing double slash', async ({
    page
  }) => {
    await page.goto('http://localhost:3000')

    await expect(page.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute(
      'href',
      '/en'
    )
  })

  test('prefixes non-root links with the locale without an extra slash', async ({ page }) => {
    await page.goto('http://localhost:3000')

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
    await page.goto('http://localhost:3000/about')

    await expect(page.getByRole('link', { name: 'About', exact: true })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  test('does not set aria-current on links that do not match the current page', async ({
    page
  }) => {
    await page.goto('http://localhost:3000/about')

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
    await page.goto('http://localhost:3000')

    await expect(page.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute(
      'aria-current',
      'page'
    )

    await page.goto('http://localhost:3000/query')

    await expect(page.getByRole('link', { name: 'Home', exact: true })).not.toHaveAttribute(
      'aria-current'
    )
    await expect(page.getByRole('link', { name: 'Query', exact: true })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })
})