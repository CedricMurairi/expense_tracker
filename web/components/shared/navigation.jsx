import React from "react";
import Link from "next/link";

export default function NavigationBar({ page }) {
  let routes = {
    Home: "/",
    Insights: "/insights",
    Goals: "/goals",
    Recommendation: "/recommendation",
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
    </div>
  );
}
