export default function Image({ ...props }) {
  return (
    <img
      alt={"Computer Generated Image"}
      className={props.className}
      height={256}
      width={256}
      src={props.src}
    />
  );
}
