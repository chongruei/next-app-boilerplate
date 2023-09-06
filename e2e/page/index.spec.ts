import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000')
})

test.describe('Index Page', () => {
  test('should display the title and description in English', async ({ page }) => {
    const pageTitle = await page.innerText('h1')
    expect(pageTitle).toBe('Next.js app router boilerplate')

    const selectValue = await page.getByTestId('locale-switcher-select').inputValue()
    expect(selectValue).toBe('en')

    await expect(page.getByTestId('description')).toHaveText(
      'This is a basic example that demonstrates the usage of next-intl with the Next.js App Router. Try changing the locale in the top right corner and see how the content changes.'
    )
  })

  test('should display the title and description in Chinese (Simplified)', async ({ page }) => {
    // await page.getByTestId('locale-switcher-select').selectOption('zh-CN', { timeout: 2000 })

    // const selectValue = await page.getByTestId('locale-switcher-select').inputValue()
    // expect(selectValue).toBe('zh-CN')

    // await page.waitForTimeout(2000)
    await page.goto('http://localhost:3000/zh-CN')

    const currentURL = await page.url()
    expect(currentURL).toBe('http://localhost:3000/zh-CN')

    const selectedOptionText = await page.getByTestId('locale-switcher-select-zh-CN').textContent()
    expect(selectedOptionText).toBe('简体中文')

    const pageTitle = await page.innerText('h1')
    expect(pageTitle).toBe('Next.js app router 模板')

    await expect(page.getByTestId('description')).toHaveText(
      '这是一个基本范例，演示了如何在 Next.js App Router 中使用 next-intl。尝试在右上角更改语言环境，观察内容的变化。'
    )
  })

  test('should display the title and description in Chinese (Traditional)', async ({ page }) => {
    // await page.getByTestId('locale-switcher-select').selectOption('zh-TW', { timeout: 2000 })

    // const selectValue = await page.getByTestId('locale-switcher-select').inputValue()
    // expect(selectValue).toBe('zh-TW')

    // await page.waitForTimeout(2000)

    await page.goto('http://localhost:3000/zh-TW')

    const currentURL = await page.url()
    expect(currentURL).toBe('http://localhost:3000/zh-TW')

    const pageTitle = await page.innerText('h1')
    expect(pageTitle).toBe('Next.js app router 模板')

    await expect(page.getByTestId('description')).toHaveText(
      '這是一個基本範例，演示了如何在 Next.js App Router 中使用 next-intl。嘗試在右上角更改語言環境，觀察內容的變化。'
    )
  })
  test('should display a code element in the description', async ({ page }) => {
    const codeElement = await page.innerText('code.font-mono.text-white')
    expect(codeElement).toBe('next-intl')
  })
})
