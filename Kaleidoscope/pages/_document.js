import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Kaleidoscope - Where neuroscience meets clarity" />
        <meta property="og:title" content="Kaleidoscope" />
        <meta property="og:description" content="Neuroscience without the academic hangover" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 