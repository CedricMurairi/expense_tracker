import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { continueWithGoogle } from "@data/auth";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Footer from "@components/shared/footer";
import { setUser } from "@store/userSlice";
import { setInfo } from "@store/infoSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseconfig";

export default function Login() {
  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== undefined && user !== null) {
        dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            accessToken: user.accessToken,
          })
        );
        dispatch(
          setInfo({
            message: "You are already logged in",
            type: "info",
            show: true,
          })
        );
        route.push("/");
      }
    });
  }, []);

  const login = async () => {
    try {
      const user = continueWithGoogle();
      if (user !== null && user !== undefined) {
        dispatch(
          setUser({
            uid: user?.uid,
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
            accessToken: user?.accessToken,
          })
        );
        route.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const slider = [
    "Track your expenses per category",
    "Set financial goals",
    "Get recommendations, insights and more",
    "Optimize your spending habits",
    "All in one place",
    "Track Now!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slider.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="text-4xl font-bold mb-5">
          <span className="text-gray-500">Ex</span>
          <span className="text-gray-700">Tracker</span>
        </div>
        <div>
          <motion.div
            className="text-2xl font-bold text-center mb-10 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {slider[currentIndex]}
          </motion.div>
        </div>
        <button
          onClick={login}
          className="flex items-center py-2 px-5 border border-gray-500 rounded-xl"
        >
          <img
            className="inline-block mr-2"
            width="25"
            height="25"
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="google-logo"
          />
          Continue With Google
        </button>
      </div>
      <Footer />
    </div>
  );
}
