import Image from "next/image";
import styles from "./page.module.css";

import downloadIcon from "../public/icons/download_item.svg";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={"animated_rainbow_1"}>Prill.io</span>
        </h1>
        <br></br>
        <div className={styles.grid}>
          <a href="https://beta.nextjs.org/docs" className={styles.card}>
            <h2>Continue To App &rarr;</h2>
            <p>Generate New Images with Doll-E 2.0</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <div className="flex flex-row">
              <h2>Download Resume</h2>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}
