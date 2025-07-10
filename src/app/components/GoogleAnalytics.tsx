'use client';
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      {/* GA4 Script Loader */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5EXMTLV7W5"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5EXMTLV7W5');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
