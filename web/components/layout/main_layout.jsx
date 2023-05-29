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
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (fireUser) => {
      if (fireUser) {
        dispatch(
          setUser({
            uid: fireUser.uid,
            name: fireUser.displayName,
            email: fireUser.email,
            photo: fireUser.photoURL,
            accessToken: fireUser.accessToken,
          })
        );
      } else {
        route.push("/login");
      }
    });
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center max-sm:p-0 p-24">
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
      <div
        className={`w-full ${
          showSettings ? "blur" : "blur-none"
        }`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
