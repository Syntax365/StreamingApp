import Image from "next/image";
import { motion } from "framer-motion";

export const Link = (props: any) => {
  const { href, imgSrc, alt, text } = props;

  return (
    <motion.a
      className="flex flex-grow m-2 rounded-lg h-10"
      href={href}
      whileHover={{
        backgroundColor: "#8d4585",
        scale: 1.02,
        transition: { duration: 0.15 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="flex flex-row flex-grow items-center ml-2">
        <Image src={imgSrc} alt={alt} />
        <span className={"pl-2 text-xl"}>{text}</span>
      </div>
    </motion.a>
  );
};
