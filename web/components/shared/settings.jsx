import React from "react";
import { useRouter } from "next/router";
import { auth } from "firebaseconfig";
import { useDispatch } from "react-redux";
import { removeUser } from "store/userSlice";

export function SettingsCard() {
  const route = useRouter();
  const dispatch = useDispatch();
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
  };

  return (
    <div className="z-50 py-5 px-5 absolute top-14 w-[250px] h-[200px] rounded-lg border-[0.1px] border-gray-200 bg-gray-50 shadow-2xl shadow-slate-300">
      <h4 className="border-b border-gray-200 pb-1">Settings</h4>
      <ul className="pt-2">
        <SettingsTextButton
          action={showSomething}
          displayText="Enter some stuff"
        />
      </ul>
      <ul className="border-t border-gray-200 mt-5">
        <SettingsTextButton action={logout} displayText="Sign out" />
        <SettingsTextButton
          action={showSomething}
          showDanger={true}
          displayText="Delete account"
        />
      </ul>
    </div>
  );
}

export function SettingsTextButton({ action, displayText, showDanger, value }) {
  return (
    <li
      onClick={() => action()}
      className={`${
        !showDanger ? "text-gray-500" : "text-red-500"
      } cursor-pointer flex justify-between w-full my-1`}
    >
      <span>{displayText}</span>
      {value ? <span>{value}</span> : null}
    </li>
  );
}
