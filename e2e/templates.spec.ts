import { test, expect } from '@playwright/test'

test.describe('Templates Gallery', () => {
  test('should load the templates page', async ({ page }) => {
    await page.goto('/templates')

    await expect(page.getByRole('heading', { name: '템플릿 갤러리' })).toBeVisible()
    await expect(page.getByText('다양한 스타일과 레이아웃의 카드뉴스 템플릿을')).toBeVisible()
  })

  test('should display style filter buttons', async ({ page }) => {
    await page.goto('/templates')

    await expect(page.getByRole('heading', { name: '스타일' })).toBeVisible()

    const styleFilterGroup = page.locator('h3:has-text("스타일") + div')
    await expect(styleFilterGroup.getByRole('button', { name: '전체' })).toBeVisible()
  })

  test('should display slide type filter buttons', async ({ page }) => {
    await page.goto('/templates')

    await expect(page.getByRole('heading', { name: '슬라이드 타입' })).toBeVisible()

    const typeFilterGroup = page.locator('h3:has-text("슬라이드 타입") + div')
    await expect(typeFilterGroup.getByRole('button', { name: '전체' })).toBeVisible()
  })

  test('should filter templates by style', async ({ page }) => {
    await page.goto('/templates')

    const galleryGrid = page.locator('.grid')
    const initialCount = await galleryGrid.locator('> *').count()

    const styleButtons = page.locator('h3:has-text("스타일") + div button')
    const secondButton = styleButtons.nth(1)
    await secondButton.click()

    const filteredCount = await galleryGrid.locator('> *').count()
    expect(filteredCount).toBeLessThan(initialCount)
  })

  test('should show "전체" filter as active by default', async ({ page }) => {
    await page.goto('/templates')

    const styleFilterGroup = page.locator('h3:has-text("스타일") + div')
    const allButton = styleFilterGroup.getByRole('button', { name: '전체' })

    await expect(allButton).toHaveClass(/bg-accent/)
  })
})
