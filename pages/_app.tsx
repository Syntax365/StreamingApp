import "../styles/globals.css";
import type { AppProps } from "next/app";

import Head from "next/head";
import { NavigationPane } from "../components/NavigationPane";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="page-container">
      <Head>
        <title>Tyler Prill | Software Engineer</title>
      </Head>
      <div id="content" className="relative flex w-full flex-row text-center">
        <NavigationPane />
        <div className="flex flex-col flex-grow">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
