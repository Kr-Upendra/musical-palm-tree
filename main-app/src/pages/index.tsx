import React, { Suspense, lazy } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const CardContainer = lazy(() => import("list-app/CardContainer"));

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading CardContainer...</div>}>
        <CardContainer />
      </Suspense>
      <Footer />
    </>
  );
}
