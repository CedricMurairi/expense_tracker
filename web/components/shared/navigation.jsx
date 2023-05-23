import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "firebaseconfig";

export default function NavigationBar({ page }) {
  const route = useRouter();
  let routes = {
    Home: "/",
    Insights: "/insights",
    Goals: "/goals",
    Recommendation: "/recommendation",
  };

  const logout = async () => {
    try {
      await auth.signOut(auth);
      route.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row gap-10">
      {Object.keys(routes).map((route, index) => {
        return (
          <li key={index} className={`${page===route ? "underline" : ""} list-none`}>
            <Link href={routes[route]}>{route}</Link>
          </li>
        );
      })}
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
