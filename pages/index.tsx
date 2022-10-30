import Head from "next/head";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tyler Prill</title>
      </Head>

      <main className={styles.main}>
        <motion.h1
          className={"text-3xl font-bold "}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          Come on Gillow.
        </motion.h1>
        <motion.p
          className={"text-2xl font-bold"}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          Just one game of league, it will be ok.
        </motion.p>
      </main>
    </div>
  );
}
