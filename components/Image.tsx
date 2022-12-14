import NextImage from "next/image";

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

export default function Image({ ...props }) {
  return (
    <NextImage
      alt={"Computer Generated Image"}
      className={props.className}
      height={props.height || 256}
      width={props.height || 256}
      src={
        props.src || `data:image/svg+xml;base64,${toBase64(shimmer(256, 256))}`
      }
    />
  );
}
