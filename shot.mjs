import { chromium } from 'playwright'

const URL = 'http://localhost:4173/poliouiux/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto(URL, { waitUntil: 'networkidle' })

// 1) Hero
await page.waitForTimeout(2500)
await page.screenshot({ path: '/tmp/01-hero.png' })

// 2) Colony — scroll down
await page.evaluate(() => document.getElementById('colony').scrollIntoView())
await page.waitForTimeout(1200)
await page.screenshot({ path: '/tmp/02-colony.png' })

// 3) Click an ant -> brain
await page.locator('.ant-walker').first().click({ force: true })
await page.waitForTimeout(1600)
await page.screenshot({ path: '/tmp/03-brain.png' })

// 4) Click a bubble -> detail
await page.locator('.orb').first().click({ force: true })
await page.waitForTimeout(1200)
await page.screenshot({ path: '/tmp/04-detail.png' })

await browser.close()
console.log('done')
