import { useState } from "react";
import Image from "./Image";

export default function hero() {
  const [isFetching, setIsFetching] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const submitImage = async (imageString: FormDataEntryValue) => {
    const body = { imageString: imageString };

    const response = await window.fetch("/api/getImages", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(body),
    });

    const { imageURL, error } = await response.json();

    console.log(imageURL);
    setImageSrc(imageURL);
    setErrorStatus(error);
  };

  return (
    <>
      <div className="h-[80vh] max-h-[300px] md:max-h-[450px] lg:max-h-[650px] z-10 w-full flex justify-center ">
        <div className="m-auto">
          <h1 className={"text-5xl font-bold pb-8 text-center text-white"}>
            Generate New Images
          </h1>
          <form
            role="search"
            id="form"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.target as HTMLFormElement);
              const formProps = Object.fromEntries(formData);
              if (formProps && formProps.imageString) {
                submitImage(formProps.imageString);
              }
            }}
          >
            <input
              style={{ color: "white" }}
              type="search"
              id="query"
              name="imageString"
              placeholder="Iridescent Cows jumping over..."
              aria-label="Generate Images Courtesy of DOLL-E 2.0 AI"
            />
            <button>
              <svg viewBox="0 0 1024 1024">
                <path
                  className="path1"
                  d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"
                ></path>
              </svg>
            </button>
          </form>
          {imageSrc && (
            <div className={"flex justify-center py-4"}>
              <Image className="rounded-xl" src={imageSrc} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
