import { useState } from "react";

export default function Image({ ...props }) {
  const [view, setView] = useState({});

  return (
    <img
      className={props.className}
      height="256px"
      width="256px"
      src={props.src}
    />
  );
}
