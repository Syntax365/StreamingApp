"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoginCTA } from "../../components/LoginCTA";
import { ImageCard } from "../../components/ImageCard";
import { useMediaQuery } from "../../hooks/mediaQuery";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { clientId } from "../../components/LoginCTA/config";

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
  const clientID = clientId;

  const isSmall = useMediaQuery("(min-width: 480px)");
  const isMediumLower = useMediaQuery("(min-width: 678px)");
  const isMediumUpper = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 945px)");

  const isTall = useMediaQuery("(min-height: 950px)") || isLarge;

  const shouldStack =
    !isSmall ||
    (isSmall && !isMediumLower) ||
    (isSmall && !isLarge && isMediumLower && isMediumUpper);

  const stackClasses = shouldStack ? "flex-col" : "flex-row-reverse";
  let isTallClasses = isTall ? styles.isTallMain : styles.isShortMain;

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prompt, setPrompt] = useState(
    "My Neighbor Totoro standing in the rain holding an umbrella, digital art.",
  );
  const [src, setSrc] = useState("/totoro_hero_image.png");

  const login = () => {
    setIsAuthenticated(true);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAuthenticated) {
      if (prompt) {
        setSrc("fallback");
        setIsSubmitting(true);

        const body = { imageString: prompt };

        const response = await window.fetch("/api/getImages", {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(body),
        });

        const { imageURL } = await response.json();

        setSrc(imageURL);
        console.log(imageURL);
        setIsSubmitting(false);
        console.log("Successful Submit");
      }
    }
  };

  return (
    <div>
      <main className={`m-3 flex items-center ${isTallClasses}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 30 }}
          className={"p-4 rounded-xl flex flex-col max-w-4xl"}
        >
          <h1 className={`pb-2 ${styles.title}`}>
            Images<span className={"animated_rainbow_1"}> Imagined</span>
          </h1>
          <p className={`pb-2 md:pb-4 ${styles.description}`}>
            Generate new images with the click of a button.
          </p>
          <div className={`flex justify-center items-center ${stackClasses}`}>
            <div className={`flex justify-center ${shouldStack ? "pb-4" : ""}`}>
              <ImageCard priority={true} prompt={prompt} src={src} />
            </div>
            <div
              className={`flex flex-col w-full justify-center items-center h-full ${
                shouldStack ? "" : "mr-4 justify-start items-start h-[368px]"
              }`}
            >
              <form
                className={"flex flex-grow flex-col"}
                onSubmit={(event) => {
                  event.preventDefault();
                  submit(event);
                }}
              >
                <textarea
                  id="subject"
                  name="subject"
                  onChange={(event) => {
                    setPrompt(event.target.value);
                  }}
                  placeholder="Example Prompt: My Neighbor Totoro standing in the rain holding an umbrella, digital art."
                  className={`border-purple-300 border-2 rounded-xl p-4 ${
                    shouldStack ? "w-[292px] h-[120px]" : "h-full w-[370px]"
                  }`}
                />
                <div
                  className={`flex  items-center  ${
                    shouldStack
                      ? "flex-col  w-[292px] pt-4"
                      : "flex-row w-full pt-4"
                  }`}
                >
                  {!isAuthenticated && (
                    <p
                      className={`text-left text-sm text-gray-400 flex flex-grow
                  ${shouldStack ? "pb-2" : "w-[150px] pr-2"}`}
                    >
                      {!isAuthenticated
                        ? "Verify your identiy with your Google Account to proceed."
                        : ""}
                    </p>
                  )}

                  <GoogleOAuthProvider clientId={clientID}>
                    <LoginCTA
                      isStacked={shouldStack}
                      login={login}
                      isSubmitting={isSubmitting}
                    />
                  </GoogleOAuthProvider>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
        <div className="h-[120px] md:hidden"></div>
      </main>
    </div>
  );
}
