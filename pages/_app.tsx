import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" enableSystem={false}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
