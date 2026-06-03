import Script from 'next/script'

export default function GoogleTagManager() {
  return (
    <>
      {/* Google Tag Manager - dataLayer init */}
      <Script
        id="gtm-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
          `,
        }}
      />
      {/* Google Tag Manager - script load */}
      <Script
        src="https://www.googletagmanager.com/gtm.js?id=GTM-NMWJK7DD"
        strategy="afterInteractive"
      />
    </>
  )
}
