// components/AdBanner.js
import React from "react";
import Script from "next/script";

const AdBanner = () => (
  <div style={{ textAlign: "center", margin: "20px 0" }}>
    {/* Ad Configuration Script */}
    <Script
      id="ad-config"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          atOptions = {
            'key': '3e5c0db0e54f3f6872ff8546641e31c0',
            'format': 'iframe',
            'height': 60,
            'width': 468,
            'params': {}
          };
        `,
      }}
    />

    {/* Ad Banner Script */}
    <Script
      src="//disgustingmad.com/3e5c0db0e54f3f6872ff8546641e31c0/invoke.js"
      strategy="afterInteractive"
    />
  </div>
);

export default AdBanner;
