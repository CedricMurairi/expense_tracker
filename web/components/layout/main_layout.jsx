import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "@components/shared/header";
import Footer from "@components/shared/footer";
import NavigationBar from "@components/shared/navigation";
import Head from "next/head";
import Info from "@components/shared/info";
import { setUser } from "@store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseconfig";
import { useRouter } from "next/router";

export default function MainLayout({ children, headerContent, page }) {
  const [showSettings, setShowSettings] = useState(false);
  const route = useRouter();
  const info = useSelector((state) => state.info.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAndSetUser = async () => {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, resolve, reject);
      });

      if (user) {
        dispatch(setUser(user.providerData[0]));
      } else {
        route.push("/login");
      }
    };

    getAndSetUser();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center max-sm:px-0 p-24 transition-all">
      <Info data={info} />
      <Head>
        <title>{page}</title>
      </Head>
      <NavigationBar
        page={page}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <Header content={headerContent} />
      <div className={`w-full ${showSettings ? "blur" : "blur-none"} transition-all`}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
