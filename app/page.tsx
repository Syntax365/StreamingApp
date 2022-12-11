"use client";

import styles from "./page.module.css";
import { motion } from "framer-motion";
import { useEffect } from "react";

const WelcomeCard = (props: any) => {
  const { children, href, loadSequence } = props;

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 30 }}
      transition={{ delay: 0.35 * loadSequence }}
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.2 }}
        className="border-2 border-purple-300 p-4 rounded-xl text-left text-wrap my-4 md:mx-4 max-w-[350px] shadow-lg h-auto md:h-32"
      >
        {children}
      </motion.div>
    </motion.a>
  );
};

const setRootHeight = (windowHeight: number) => {
  document.documentElement.style.setProperty(
    "--viewHeight",
    `${windowHeight - 80}px`,
  );
};

export default function WelcomePage() {
  useEffect(() => {
    const windowHeight = window.innerHeight;

    if (windowHeight) {
      setRootHeight(windowHeight);
    }
  }, []);

  return (
    <div className={styles.container}>
      <main className={` ${styles.main}`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: 30 }}>
          <h1 className={styles.title}>
            Welcome to <span className={"animated_rainbow_1"}>Prill.io</span>
          </h1>
          <p className={`pt-1 pb-3 ${styles.description}`}>
            Imagine. Innovate. Engineer.
          </p>
        </motion.div>

        <div id="welcome-cards" className={"flex flex-col"}>
          <div className={"flex flex-wrap justify-center"}>
            <WelcomeCard href="/createimage" loadSequence={1}>
              <>
                <div className="flex flex-row">
                  <h2
                    className="text-2xl mb-2 flex flex-grow"
                    style={{ textAlign: "left" }}
                  >
                    Generate Images
                  </h2>
                  <img
                    height="28px"
                    width="28px"
                    src={"/icons/start_icon.svg"}
                  />
                </div>
                <p>
                  Create original, realistic images and art with DALL-E 2's
                  latest release.
                </p>
              </>
            </WelcomeCard>
            <WelcomeCard href="/collections" loadSequence={2}>
              <>
                <div className="flex flex-row">
                  <h2
                    className="text-2xl mb-2 flex flex-grow"
                    style={{ textAlign: "left" }}
                  >
                    Collections
                  </h2>
                  <img
                    height="28px"
                    width="28px"
                    src={"/icons/start_icon.svg"}
                  />
                </div>
                <p>
                  View the most recent creations and promps from your peers and
                  collegues.
                </p>
              </>
            </WelcomeCard>
          </div>
        </div>
      </main>
    </div>
  );
}
