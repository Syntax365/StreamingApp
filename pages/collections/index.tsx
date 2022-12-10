import ImageTile from "../../components/ImageTile";

export default function Home() {
  return (
    <main className={"w-full flex flex-row"}>
      <div id="content" className="flex flex-grow h-full flex-col text-center">
        <h1 className={"p-4 text-4xl"} style={{ color: "#301934" }}>
          <b>Recent Image Collection</b>
        </h1>
        <div className={"border-b-2 border-purple-200 mb-4 mx-4 "} />
        <ImageTile />
      </div>
    </main>
  );
}
