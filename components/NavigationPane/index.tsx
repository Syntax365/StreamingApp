"use client";

import { useIsMedium } from "../../hooks/mediaQuery";
import { Link } from "../../components/Link";
import Image from "next/image";
import { motion } from "framer-motion";

import SocialLinks from "../SocialLinks";

import upChevron from "../../public/images/upChevron.svg";
import createNewSVG from "../../public/images/createImage.svg";
import collectionsSVG from "../../public/images/collectionsImage.svg";
import { useState, Suspense } from "react";

export const NavigationPane = (props: any) => {
  const isMedium = useIsMedium();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const children = (
    <ul id="navigation-links" className="top-1">
      <li className="text-center text-2xl py-4 md:py-2 ">
        <b>Prill.io</b>
        <div className="border-b mx-3 pt-4 md:pt-1" />
      </li>
      <li>
        <Link
          href="/create-image"
          imgSrc={createNewSVG}
          alt="Create Image Icon"
          text="Create New"
        />
      </li>
      <li>
        <Link
          href="/collections"
          imgSrc={collectionsSVG}
          alt="Collections Icon"
          text="Collections"
        />
      </li>
    </ul>
  );

  const toggleMobileMenue = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <Suspense>
      {isMedium ? (
        <motion.div
          onClick={toggleMobileMenue}
          className="w-full z-10  text-white flex text-center rounded-t-lg bottom-0 fixed"
          style={{ backgroundColor: "#301934" }}
          initial={{ height: "50px" }}
          transition={isMobileOpen ? { height: "auto" } : { height: "50px" }}
        >
          <div className="w-full overflow-y-hidden items-center">
            <div className="w-full items-center flex flex-col">
              <motion.div animate={{ rotate: isMobileOpen ? 180 : 0 }}>
                <Image src={upChevron} alt="Up Chevron" height={45} />
              </motion.div>
              <div className="w-full">{children}</div>
              <div>
                <SocialLinks />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div
          className="sticky top-0"
          style={{
            backgroundColor: "#301934",
            height: "100%",
            alignSelf: "flex-start",
          }}
        >
          <div
            id="left-nav"
            className="min-w-[225px] text-white text-xl h-[100vh]"
          >
            {children}
            <div className="w-full absolute bottom-0">
              <SocialLinks />
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};
