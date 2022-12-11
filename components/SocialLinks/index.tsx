import React from "react";

import twitter from "../../public/images/twitter.svg";
import facebook from "../../public/images/facebook.svg";
import github from "../../public/images/github.svg";
import linkedin from "../../public/images/linkedin.svg";

import Image from "next/image";

const SocialLinks: React.FC = () => {
  return (
    <div className="md:border-t md:border-purple-100 py-4 mt-4 mx-3">
      <ul className="list-reset flex justify-center flex-wrap py-2">
        <li className="mx-3">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.facebook.com/tyler.prill.5/"
            className="text-gray-700 hover:text-gray-800"
          >
            <i className="fab fa-facebook">
              <Image src={facebook} alt={"Facebook Icon"} />
            </i>
          </a>
        </li>
        <li className="mr-3">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://twitter.com/PrillTyler"
            className="text-gray-700 hover:text-gray-800"
          >
            <i className="fab fa-twitter">
              <Image src={twitter} alt={"Twitter Icon"} />
            </i>
          </a>
        </li>
        <li className="mr-3">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/tyler-prill/"
            className="text-gray-700 hover:text-gray-800"
          >
            <i className="fab fa-linkedin">
              <Image src={linkedin} alt={"Linkedin Icon"} />
            </i>
          </a>
        </li>
        <li className="mr-3">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/tylerprill-rhdc"
            className="text-gray-700 hover:text-gray-800"
          >
            <i className="fab fa-github">
              <Image src={github} alt={"Github Icon"} />
            </i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
