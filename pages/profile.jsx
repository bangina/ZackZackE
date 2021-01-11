import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const followerList = [
    { nickname: "Ina" },
    { nickname: "Jean" },
    { nickname: "Roy" },
  ];
  const followingList = [
    { nickname: "Ina" },
    { nickname: "Jean" },
    { nickname: "Roy" },
  ];

  return (
    <AppLayout>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={followerList} />
      <FollowList header="팔로워 목록" data={followingList} />
    </AppLayout>
  );
};

export default Profile;
