// pages/_app.js
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </Head>
      <div className="noverflow">
        <Component {...pageProps} />
      </div>
    </>
  )
}
