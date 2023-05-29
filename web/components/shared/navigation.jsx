import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import { SettingsCard } from "./settings";
import useWindowSize from "@hooks/window_size";

export default function NavigationBar({ page, showSettings, setShowSettings }) {
  const user = useSelector((state) => state.user.value);
  const size = useWindowSize();
  let routes = {
    Home: "/",
    Insights: "/insights",
    Goals: "/goals",
    Recommendation: "/recommendation",
  };

  return (
    <div className="flex flex-row max-md:flex-col-reverse gap-10 items-center">
      <ul className="flex flex-row items-center gap-10">
        {Object.keys(routes).map((route, index) => {
          return (
            <li
              key={index}
              className={`${page === route ? "underline" : ""} list-none`}
            >
              <Link href={routes[route]}>{route}</Link>
            </li>
          );
        })}
      </ul>
      {user ? (
        <div className="relative">
          <div
            onClick={() => setShowSettings(!showSettings)}
            className="cursor-pointer flex flex-row-reverse max-md:flex-col gap-2 items-center"
          >
            <Image
              alt="user photo"
              className="rounded-full"
              width={40}
              height={40}
              src={user?.photo}
            />
            <div className="text-right max-md:text-center">
              <p className="font-bold text-sm">{user.name}</p>
              <p className="text-xs">{user.email}</p>
            </div>
          </div>
          {showSettings ? <SettingsCard /> : null}
        </div>
      ) : null}
    </div>
  );
}
