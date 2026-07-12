import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/query')
})

test.describe('Query Page', () => {
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

  test('stops paginating once a page returns no more posts', async ({ page }) => {
    // Make the second page come back empty. With the getNextPageParam fix,
    // an empty page ends pagination and the "Load More" button disappears;
    // the old code returned pages.length + 1 unconditionally and kept it.
    await page.route(
      url => url.pathname === '/posts' && url.searchParams.get('_page') === '2',
      route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
    )

    await page.goto('http://localhost:3000/query')

    const loadMore = page.getByRole('button', { name: 'Load More' })
    await expect(loadMore).toBeVisible()

    await loadMore.click()

    await expect(loadMore).toHaveCount(0)
  })
})
