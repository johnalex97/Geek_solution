import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const projectRoot = resolve('.')

describe('site shell assets', () => {
  it('uses the Geek Solution logo as the browser and Apple icon', () => {
    const html = readFileSync(`${projectRoot}/index.html`, 'utf8')
    const document = new DOMParser().parseFromString(html, 'text/html')

    expect(document.querySelector('link[rel="icon"]')?.getAttribute('href')).toBe(
      '/favicon-geek-solution.png',
    )
    expect(
      document.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href'),
    ).toBe('/favicon-geek-solution.png')
  })

  it('provides a square branded favicon image', () => {
    const faviconPath = `${projectRoot}/public/favicon-geek-solution.png`

    expect(existsSync(faviconPath)).toBe(true)
    expect(statSync(faviconPath).size).toBeGreaterThan(0)

    const image = readFileSync(faviconPath)
    expect(image.readUInt32BE(16)).toBe(image.readUInt32BE(20))
    expect(image.readUInt32BE(16)).toBeGreaterThanOrEqual(48)
  })

  it('publishes the Google Search Console verification file unchanged', () => {
    const verificationPath = `${projectRoot}/public/google16e801711f1fdd25.html`

    expect(existsSync(verificationPath)).toBe(true)
    expect(readFileSync(verificationPath, 'utf8').trim()).toBe(
      'google-site-verification: google16e801711f1fdd25.html',
    )
  })
})
