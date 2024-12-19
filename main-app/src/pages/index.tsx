import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";

const CardContainer = dynamic(() => import("list-app/CardContainer"));

export default function Home() {
  return (
    <>
      <Header />
      <CardContainer />
      <Footer />
    </>
  );
}
