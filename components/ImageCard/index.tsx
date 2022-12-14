import Image from "../../components/Image";

export function ImageCard(props: any) {
  return (
    <div
      className={
        "border-purple-200 border-2 rounded-xl p-4 flex flex-col justify-center items-center relative"
      }
    >
      <Image
        className={"rounded-xl"}
        src={"/totoro_hero_image.png"}
        alt={"Totoro Placeholder"}
      />
      <div className="pt-2">
        <p className="text-left flex flex-col">
          <span style={{ fontWeight: "500" }}>Prompt:</span>
          <i className="w-[256px]">
            My Neighbor Totoro standing in the rain holding an umbrella, digital
            art.
          </i>
        </p>
      </div>
    </div>
  );
}
7;
