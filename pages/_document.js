import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="Impress your connections with LinkedInfluencer™!"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="Party, Round, Mag, Magazine, 2022, Volume, Vol, 001, Party Round Mag, limited, edition, filled, alpha, editorial, mini, drops"
        />
        <meta name="theme-color" content="#007bb6" />
        <meta
          name="msapplication-TileImage"
          content="https://uploads-ssl.webflow.com/63239dddf0aabc3869e7c9c8/632529b77c17a71d31f4759f_preview.png"
        />
        <meta name="msapplication-TileColor" content="#007bb6" />
        <link rel="shortcut icon" href="/img/common/icon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/common/app_icon.png"
        />
        <meta
          property="og:title"
          content="LinkedInfluencer, a mini-drop by Party Round"
        />
        <meta property="og:site_name" content="LinkedInfluencer" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Impress your connections with LinkedInfluencer™!"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PartyRound" />
        <meta name="twitter:creator" content="@PartyRound" />
        <meta
          name="twitter:image"
          content="https://uploads-ssl.webflow.com/63239dddf0aabc3869e7c9c8/632529b77c17a71d31f4759f_preview.png"
        />
        <meta property="og:url" content="https://linkedinfluencer.co/" />
        <meta
          property="og:title"
          content="LinkedInfluencer, a mini-drop by Party Round"
        />
        <meta
          property="og:description"
          content="Impress your connections with LinkedInfluencer™!"
        />
        <meta
          property="og:image"
          content="https://uploads-ssl.webflow.com/63239dddf0aabc3869e7c9c8/632529b77c17a71d31f4759f_preview.png"
        />

        <Script
          id="google-analytics"
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-SH3QCT86Q0"
        />
        <Script
          id="google-analytics-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || []; function gtag()
            {dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', 'G-SH3QCT86Q0');
  `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
