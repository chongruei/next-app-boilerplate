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
})
