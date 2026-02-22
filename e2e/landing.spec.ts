import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('should load the landing page with hero section', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /AI로 카드뉴스를/ })).toBeVisible()
    await expect(page.getByText('AI 기반 카드뉴스 메이커')).toBeVisible()
  })

  test('should navigate to /create when CTA button is clicked', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /카드뉴스 만들기/ }).first().click()

    await expect(page).toHaveURL('/create')
  })

  test('should navigate to /templates when secondary CTA is clicked', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /템플릿 둘러보기/ }).click()

    await expect(page).toHaveURL('/templates')
  })

  test('should display all landing sections', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('AI 기반 카드뉴스 메이커')).toBeVisible()
    await expect(page.getByRole('heading', { name: /AI로 카드뉴스를/ })).toBeVisible()
  })
})
