import React, { useEffect } from "react";
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
  const route = useRouter();
  const info = useSelector((state) => state.info.value);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (fireUser) => {
      if (fireUser) {
        dispatch(setUser({
          uid: fireUser.uid,
          name: fireUser.displayName,
          email: fireUser.email,
          photo: fireUser.photoURL,
          accessToken: fireUser.accessToken,
        }));
      } else {
        route.push("/login");
      }
    });
  }, []);

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center p-24`}
    >
      <Info data={info} />
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
