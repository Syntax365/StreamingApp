import { motion } from "framer-motion";

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center jusify-center">
      <p className={"text-white pb-10 text-3xl"}>Creating Image...</p>
      <motion.div
        animate={{
          rotate: 360,
          borderRadius: ["50% 50%", "2% 50%"],
          x: 75,
        }}
        initial={{
          x: -75,
        }}
        transition={{
          flip: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        style={{
          height: "50px",
          background: "#E81B63",
          width: "50px",
          borderRadius: "2% 50%",
        }}
      ></motion.div>
    </div>
  );
};
