import CardContainer from "@/containers/CardContainer";

export default function Home() {
  return (
    <>
      <main className="py-3">
        <h1 className="text-xl text-white font-extrabold mb-4">
          Countries List
        </h1>
        <CardContainer />
      </main>
    </>
  );
}
