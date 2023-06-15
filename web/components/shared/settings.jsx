import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "firebaseconfig";
import { useDispatch } from "react-redux";
import { removeUser } from "@store/userSlice";
import { clearData } from "@store/dataSlice";
import UpdateIncomeForm from "@components/shared/update_income_form";

export function SettingsCard() {
  const [showIncomeUpdateForm, setShowIncomeUpdateForm] = useState(false);
  const route = useRouter();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await auth.signOut(auth);
      dispatch(removeUser());
      dispatch(clearData());
      route.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const showSomething = () => {
    return;
  };

  return (
    // TODO: Implement full settings card [Language, Dark mode]
    <div className="z-50 py-5 px-5 absolute top-14 w-[250px] rounded-lg border-[0.1px] border-gray-200 bg-gray-50 shadow-2xl shadow-slate-300">
      <h4 className="border-b border-gray-200 pb-1">Settings</h4>
      <ul className="pt-2">
        <SettingsTextButton
          action={() => setShowIncomeUpdateForm(!showIncomeUpdateForm)}
          displayText="Income"
        />
        {showIncomeUpdateForm ? <UpdateIncomeForm /> : null}
        <SettingsTextButton
          action={showSomething}
          displayText="Language"
          disabled={true}
          value={"English"}
        />
        <SettingsTextButton
          action={showSomething}
          displayText="Dark mode"
          disabled={true}
          value={<input type="checkbox" onChange={() => {}} checked={false} />}
        />
        <SettingsTextButton
          action={showSomething}
          displayText="Notifications"
          disabled={true}
          value={<input type="checkbox" onChange={() => {}} checked={false} />}
        />
        <SettingsTextButton
          action={showSomething}
          displayText="Subscriptions"
        />
        {/* Edit recommendation settings {Day of the month show, send via email as report} */}
        <SettingsTextButton
          action={showSomething}
          displayText="Recommendations"
        />
        <SettingsTextButton
          action={showSomething}
          displayText="Expenditures Weights"
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

export function SettingsTextButton({
  action,
  displayText,
  showDanger,
  value,
  disabled,
}) {
  return (
    <li
      onClick={() => action()}
      className={`${!showDanger ? "text-gray-500" : "text-red-500"} ${
        disabled ? "opacity-30" : "opacity-100"
      } cursor-pointer flex justify-between w-full my-1`}
    >
      <span>{displayText}</span>
      {value ? <span>{value}</span> : null}
    </li>
  );
}
