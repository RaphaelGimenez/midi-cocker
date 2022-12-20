import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { MantineProvider } from '@mantine/core';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to app!</title>
      </Head>
      <main className="app">
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </main>
    </>
  );
}

export default CustomApp;
