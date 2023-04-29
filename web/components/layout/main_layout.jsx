import React from "react";
import Header from "@components/shared/header";
import Footer from "@components/shared/footer";
import NavigationBar from "@components/shared/navigation";
// import FloatingButton from "@components/shared/floating_button";
import Head from "next/head";

export default function MainLayout({ children, headerContent, page }) {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center p-24`}
    >
      <Head>
        <title>{page}</title>
      </Head>
      <p className="bg-red-200 border rounded-2xl px-3 py-1 mb-10 font-extralight text-xs">
        Currently using Mock Data | Real data requires input every day, for a
        month
      </p>
      <NavigationBar page={page} />
      <Header content={headerContent} />
      {children}
      <Footer />
      {/* <FloatingButton /> */}
    </div>
  );
}
