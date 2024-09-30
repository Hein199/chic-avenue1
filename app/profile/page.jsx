import React from "react";
import getId from "../functions/id";
import UserProfileForm from "./components/form";

const ProfilePage = async (data) => {
  const id = getId();
  console.log({id})
  const response = await fetch(`https://chic-avenue1.vercel.app/api/user/user/${id}`);
  const user = await response.json();
  return <>
    <UserProfileForm userData={user.user} id={id} />
  </>;
};

export default ProfilePage;
