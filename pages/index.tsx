import Head from "next/head";
import styles from "../styles/Home.module.css";
import ImageTile from "../components/ImageTile";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <div
        className="hero min-h-[450px] h-[80vh] max-h-[300px] md:max-h-[500px] lg:max-h-[750px] z-0"
        style={{ background: "linear-gradient(145deg,#0d47a1,#42a5f5)" }}
      ></div>
      <Head>
        <title>Tyler Prill</title>
      </Head>

      <main className={"w-full flex justify-center p-4"}>
        <div style={{ zIndex: "10" }} className={"container"}>
          <Hero />
          <h2 className={"text-3xl font-bold pb-8 text-center w-full"}>
            Recently Developed Images
          </h2>
          <ImageTile />
        </div>
      </main>
    </>
  );
}
