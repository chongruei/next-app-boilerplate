import { expect, test } from '@playwright/test'

test.describe('Query Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/query')
  })

  test('should display the title and description in English', async ({ page }) => {
    const pageTitle = await page.innerText('h1')
    expect(pageTitle).toBe('React Query')

    await expect(page.getByTestId('description')).toHaveText('This is a React Query example')
  })

  test('should display 10 items by query result', async ({ page }) => {
    const postContainer = await page.getByTestId('post-container')

    // Check if the post container exists
    expect(postContainer).not.toBeNull()

    const posts = await page.$$('[data-testid="post"]')

    // Check if there are exactly 10 posts displayed
    expect(posts.length).toBe(10)
  })
})

test.describe('Query Page - pagination', () => {
  test('fetches and appends additional posts when "Load More" is clicked', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts**', async route => {
      const url = new URL(route.request().url())
      const pageParam = Number(url.searchParams.get('_page') ?? '1')

      const posts = Array.from({ length: 5 }, (_, i) => ({
        userId: 1,
        id: (pageParam - 1) * 5 + i + 1,
        title: `Page ${pageParam} title ${i + 1}`,
        body: `Page ${pageParam} body ${i + 1}`
      }))

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(posts)
      })
    })

    await page.goto('http://localhost:3000/query')

    const posts = page.locator('[data-testid="post"]')
    await expect(posts).toHaveCount(5)

    await page.getByRole('button', { name: 'Load More' }).click()

    await expect(posts).toHaveCount(10)
    await expect(page.getByText('Page 2 title 1')).toBeVisible()
  })

  test('shows "Loading more..." while the next page is being fetched', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts**', async route => {
      const url = new URL(route.request().url())
      const pageParam = Number(url.searchParams.get('_page') ?? '1')

      if (pageParam > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      const posts = Array.from({ length: 5 }, (_, i) => ({
        userId: 1,
        id: (pageParam - 1) * 5 + i + 1,
        title: `Page ${pageParam} title ${i + 1}`,
        body: `Page ${pageParam} body ${i + 1}`
      }))

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(posts)
      })
    })

    await page.goto('http://localhost:3000/query')

    await page.getByRole('button', { name: 'Load More' }).click()

    await expect(page.getByText('Loading more...')).toBeVisible()
    await expect(page.locator('[data-testid="post"]')).toHaveCount(10)
  })

  test('stops offering "Load More" once the API returns an empty page', async ({ page }) => {
    // Regression: with the getNextPageParam fix, an empty page ends
    // pagination and the "Load More" button disappears; the old code
    // returned pages.length + 1 unconditionally and kept it around forever.
    await page.route('https://jsonplaceholder.typicode.com/posts**', async route => {
      const url = new URL(route.request().url())
      const pageParam = url.searchParams.get('_page')

      if (pageParam === '2') {
        await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
        return
      }

      const posts = Array.from({ length: 5 }, (_, i) => ({
        userId: 1,
        id: i + 1,
        title: `Mock title ${i + 1}`,
        body: `Mock body ${i + 1}`
      }))

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(posts)
      })
    })

    await page.goto('http://localhost:3000/query')

    const posts = page.locator('[data-testid="post"]')
    await expect(posts).toHaveCount(5)

    const loadMoreButton = page.getByRole('button', { name: 'Load More' })
    await expect(loadMoreButton).toBeVisible()

    await loadMoreButton.click()

    await expect(posts).toHaveCount(5)
    await expect(loadMoreButton).not.toBeVisible()
    await expect(page.getByText('Loading more...')).not.toBeVisible()
  })
})
