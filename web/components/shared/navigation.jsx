import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "firebaseconfig";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "@store/userSlice";
import Image from "next/image";

export default function NavigationBar({ page }) {
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
        <div className="flex flex-row-reverse gap-2 items-center">
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
      ) : null}
    </div>
  );
}
