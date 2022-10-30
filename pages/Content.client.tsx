"use client";

import { motion } from "framer-motion";

export default function Content({ children = <></> }) {
  return (
    <>
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
        Come On Gillow
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
        Dont be dumb lets play league.
      </motion.p>
      {children}
    </>
  );
}
