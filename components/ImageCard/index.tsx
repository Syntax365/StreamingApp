import Image from "../../components/Image";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#D1C4E9" offset="20%" />
      <stop stop-color="#EDE7F6" offset="50%" />
      <stop stop-color="#D1C4E9" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#D1C4E9" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur=".75s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function ImageCard(props: any) {
  const { prompt, src, priority = false } = props;
  return (
    <div
      className={
        "border-purple-300 border-2 rounded-xl p-4 flex flex-col justify-center items-center relative shadow-sm"
      }
    >
      <Image
        priority
        className={"rounded-xl"}
        src={
          src === "fallback"
            ? `data:image/svg+xml;base64,${toBase64(shimmer(256, 256))}`
            : src
            ? src
            : "/totoro_hero_image.png"
        }
        alt={"Totoro Placeholder"}
      />
      <div className="pt-2">
        <p className="text-left flex flex-col">
          <span style={{ fontWeight: "500" }}>Prompt:</span>
          <i className="w-[256px]">
            {prompt ||
              "My Neighbor Totoro standing in the rain holding an umbrella, digital art."}
          </i>
        </p>
      </div>
    </div>
  );
}
7;
