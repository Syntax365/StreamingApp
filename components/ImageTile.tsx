import { useEffect, useState } from "react";
import Image from "./Image";

export default function ImageTile() {
  const [imageURLArr, setImageURLArr] = useState([]);
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

    setImageURLArr(data);
  }

  useEffect(() => {
    if (!hasReq) {
      setHasReq(true);
      fetchImageTiles();
    }
  }, []);

  const generateImages = () => {
    const imageArray = [] as Array<any>;
    imageURLArr.forEach((imageURL, index) => {
      imageArray.push(
        <Image className="flex p-2" key={index} src={imageURL} />,
      );
    });

    return imageArray;
  };

  return (
    <div className="container">
      <div className="w-full flex justify-center flex-wrap">
        {generateImages()}
      </div>
    </div>
  );
}
