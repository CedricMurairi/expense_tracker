import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "firebaseconfig";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "@store/userSlice";
import Image from "next/image";

export default function NavigationBar({ page, showSettings, setShowSettings }) {
  const route = useRouter();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  let routes = {
    Home: "/",
    Insights: "/insights",
    Goals: "/goals",
    Recommendation: "/recommendation",
  };

  const logout = async () => {
    try {
      await auth.signOut(auth);
      dispatch(removeUser());
      route.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const showSomething = () => {
    return;
  }

  return (
    <div className="flex flex-row gap-10 items-center">
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
      {user ? (
        <div className="relative">
          <div
            onClick={() => setShowSettings(!showSettings)}
            className="cursor-pointer flex flex-row-reverse gap-2 items-center"
          >
            <Image
              alt="user photo"
              className="rounded-full"
              width={40}
              height={40}
              src={user.photo}
            />
            <div className="text-right">
              <p className="font-bold text-sm">{user.name}</p>
              <p className="text-xs">{user.email}</p>
            </div>
          </div>
          {showSettings ? (
            <div className="z-50 py-5 px-5 absolute top-14 w-[250px] h-[200px] rounded-lg border-[0.1px] border-gray-200 bg-gray-50 shadow-2xl shadow-slate-300">
              <h4 className="border-b border-gray-200 pb-1">Settings</h4>
              <ul className="pt-2">
                <li onClick={() => showSomething()} className="cursor-pointer flex justify-between w-full border-y border-gray-300"><span>Enter some stuff</span><span>{">"}</span></li>
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
