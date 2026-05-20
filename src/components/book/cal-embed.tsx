'use client'

import Script from 'next/script'

const CAL_USERNAME = 'kamal-hussain-jxas5y'

export function CalEmbed() {
  return (
    <>
      <Script
        id="cal-embed"
        src="https://app.cal.com/embed/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-expect-error Cal.com embed global
          const Cal = window.Cal
          if (!Cal) return
          Cal('init', { origin: 'https://cal.com' })
          Cal('inline', {
            elementOrSelector: '#cal-inline',
            calLink: CAL_USERNAME,
            config: {
              theme: 'dark',
              brandColor: '#FF4D2E',
            },
          })
        }}
      />
      <div
        id="cal-inline"
        className="mt-10 overflow-hidden rounded-xl"
        style={{ minHeight: 500 }}
      />
    </>
  )
}
