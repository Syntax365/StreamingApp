"use client";

import styles from "./page.module.css";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { LoginCTA } from "../../components/LoginCTA";
import { ImageCard } from "../../components/ImageCard";
import { useMediaQuery } from "../../hooks/mediaQuery";

const setRootHeight = (windowHeight: number) => {
  document.documentElement.style.setProperty(
    "--viewHeight",
    `${windowHeight - 80}px`,
  );
};

const removeRootHeight = (): void => {
  document.documentElement.style.setProperty("--viewHeight", `null`);
};

const handleResize = (): void => {
  const windowHeight = window.innerHeight;
  if (windowHeight) {
    setRootHeight(windowHeight);
  }
};

export default function Home() {
  const isSmall = useMediaQuery("(min-width: 480px)");
  const isMediumLower = useMediaQuery("(min-width: 678px)");
  const isMediumUpper = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 945px)");

  const isTall = useMediaQuery("(min-height: 950px)");

  const shouldStack =
    !isSmall ||
    (isSmall && !isMediumLower) ||
    (isSmall && !isLarge && isMediumLower && isMediumUpper);

  if (!shouldStack) console.log("Should NOT Stack!");

  let isTallClasses = isTall ? styles.isTallMain : styles.isShortMain;
  const stackClasses = shouldStack ? "flex-col" : "flex-row-reverse";

  useEffect(() => {
    let windowHeight = window.innerHeight;

    if (isTall) {
      setRootHeight(windowHeight);
      window.addEventListener("resize", handleResize);
    } else {
      window.removeEventListener("resize", handleResize);
      removeRootHeight();
    }
  }, [isTall]);

  return (
    <div>
      <main className={`m-3 ${isTallClasses}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 30 }}
          className={"p-4 rounded-xl flex flex-col md:justify-center"}
        >
          <h1 className={`pb-2 ${styles.title}`}>
            Images<span className={"animated_rainbow_1"}> Imagined</span>
          </h1>
          <p className={`pb-2 md:pb-4 ${styles.description}`}>
            Generate new images with the click of a button.
          </p>
          <div className={`flex justify-center items-center ${stackClasses}`}>
            <div className={"p-2"} />
            <div className={"flex justify-center pb-4"}>
              <ImageCard />
            </div>
            <div
              className={
                "flex flex-col w-full justify-center items-center md:items-start md:justify-start mr-4 h-full"
              }
            >
              <textarea
                id="subject"
                name="subject"
                placeholder="Example Prompt: My Neighbor Totoro standing in the rain holding an umbrella, digital art."
                className={
                  "w-[292px] h-[120px] md:w-full md:h-full border-purple-200 border-2 rounded-xl p-4"
                }
              />
              <div
                className={
                  "flex flex-row items-center pt-1 w-[292px] md:w-full"
                }
              >
                <p
                  className={`text-left text-sm text-gray-400 md:pr-2 md:min-w-[160px]`}
                >
                  Verify your identiy with your Google Account to proceed.
                </p>
                <LoginCTA />
              </div>
            </div>
          </div>
        </motion.div>
        <div className="h-[120px] md:hidden"></div>
      </main>
    </div>
  );
}
