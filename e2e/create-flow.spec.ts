import { test, expect } from '@playwright/test'

test.describe('Create Flow', () => {
  test('should load the create page with prompt input', async ({ page }) => {
    await page.goto('/create')

    await expect(page.getByRole('heading', { name: /어떤 카드뉴스를 만들까요/ })).toBeVisible()
    await expect(page.getByPlaceholder('카드뉴스 주제를 입력하세요')).toBeVisible()
  })

  test('should display suggested prompts', async ({ page }) => {
    await page.goto('/create')

    await expect(page.getByRole('button', { name: '2025 AI 트렌드' })).toBeVisible()
    await expect(page.getByRole('button', { name: '건강한 식습관 가이드' })).toBeVisible()
    await expect(page.getByRole('button', { name: '효과적인 시간 관리법' })).toBeVisible()
    await expect(page.getByRole('button', { name: '스타트업 성공 전략' })).toBeVisible()
  })

  test('should allow typing in the input field', async ({ page }) => {
    await page.goto('/create')

    const input = page.getByPlaceholder('카드뉴스 주제를 입력하세요')
    await input.fill('테스트 주제')

    await expect(input).toHaveValue('테스트 주제')
  })

  test('should have a send button', async ({ page }) => {
    await page.goto('/create')

    const sendButton = page.locator('button').filter({ has: page.locator('svg.lucide-send') })
    await expect(sendButton).toBeVisible()
  })
})
