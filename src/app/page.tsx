import ThreejsScene from "./components/ThreejsScene";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <h1 className="mx-auto text-2xl text-center">
        Nextjs and Three js 3d scene
      </h1>
      <ThreejsScene />
    </div>
  );
}
