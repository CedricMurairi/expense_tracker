import React, { useEffect } from "react";
import { continueWithGoogle } from "@data/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseconfig";
import { useRouter } from "next/router";

export default function Login() {
  const route = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName);
        route.push("/");
      } else {
        console.log("no user");
      }
    });
  }, []);

  const login = async () => {
    try {
      const user = continueWithGoogle();
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button
        onClick={login}
        className="py-2 px-5 border border-black rounded-xl"
      >
        Continue With Google
      </button>
    </div>
  );
}
