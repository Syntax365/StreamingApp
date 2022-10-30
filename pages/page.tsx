import Head from "next/head";
import styles from "../styles/Home.module.css";
import Content from "./Content.client";
import Leaf from "./Leaf.server";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tyler Prill</title>
      </Head>

      <main className={styles.main}>
        <Content>
          <Leaf></Leaf>
        </Content>
      </main>
    </div>
  );
}
