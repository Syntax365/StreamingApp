import { useEffect, useState } from "react";
import Image from "./Image";

export default function ImageTile() {
  const [hasReq, setHasReq] = useState(false);

  async function fetchImageTiles() {
    if (typeof window === "undefined") return;

    const response = await window.fetch("/api/getImageURLs", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });

    const { data } = await response.json();
    const payload = generateImages(data);
    setImages(payload);
  }

  useEffect(() => {
    if (!hasReq) {
      setHasReq(true);
      fetchImageTiles();
    }
  }, []);

  const generateImages = (imageURLArray: []) => {
    const imageArray = [] as Array<any>;
    imageURLArray.forEach((imageURL, index) => {
      imageArray.push(
        <Image
          className="flex m-2 rounded-xl border"
          key={index}
          src={imageURL}
        />,
      );
    });

    return imageArray;
  };

  const placeHolderImages = () => {
    const imageArray = [];
    for (let i = 0; i < 40; i++) {
      imageArray.push(<Image className="flex m-2 rounded-xl border" key={i} />);
    }

    return imageArray;
  };

  const [images, setImages] = useState(placeHolderImages());

  return <div className="w-full flex justify-center flex-wrap">{images}</div>;
}
