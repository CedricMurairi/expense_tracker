import React, { useEffect } from "react";
import Header from "@components/shared/header";
import Footer from "@components/shared/footer";
import NavigationBar from "@components/shared/navigation";
import Head from "next/head";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseconfig";
import { useRouter } from "next/router";

export default function MainLayout({ children, headerContent, page }) {
  const route = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName);
      } else {
        route.push("/login");
      }
    });
  }, []);

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center p-24`}
    >
      <Head>
        <title>{page}</title>
      </Head>
      <NavigationBar page={page} />
      <Header content={headerContent} />
      {children}
      <Footer />
    </div>
  );
}
