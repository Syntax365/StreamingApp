import Image from "../../components/Image";

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
        src={src || "/totoro_hero_image.png"}
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
