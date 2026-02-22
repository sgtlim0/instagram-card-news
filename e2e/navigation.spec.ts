import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should show desktop navigation links on wide viewport', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop-only test')

    await page.goto('/')

    const header = page.locator('header')
    await expect(header.getByRole('link', { name: '홈' })).toBeVisible()
    await expect(header.getByRole('link', { name: '템플릿' })).toBeVisible()
    await expect(header.getByRole('link', { name: '만들기' })).toBeVisible()
  })

  test('should open mobile menu on hamburger click', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test')

    await page.goto('/')

    const menuButton = page.locator('header button').filter({ has: page.locator('svg') }).last()
    await menuButton.click()

    const sheet = page.locator('[data-state="open"]')
    await expect(sheet.getByRole('link', { name: '홈' })).toBeVisible()
    await expect(sheet.getByRole('link', { name: '템플릿' })).toBeVisible()
    await expect(sheet.getByRole('link', { name: '만들기' })).toBeVisible()
  })

  test('should navigate via mobile menu', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test')

    await page.goto('/')

    const menuButton = page.locator('header button').filter({ has: page.locator('svg') }).last()
    await menuButton.click()

    const sheet = page.locator('[data-state="open"]')
    await sheet.getByRole('link', { name: '만들기' }).click()

    await expect(page).toHaveURL('/create')
  })

  test('should display brand logo in header', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('link', { name: /CardNews AI/ })).toBeVisible()
  })
})
