import React, { useEffect } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import Router from "next/router";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  //profile 화면에서 로그아웃시 redirect to main
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/"); //Next router
    }
  }, [me]);

  //미로그인시
  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={me.followings} />
      <FollowList header="팔로워 목록" data={me.followers} />
    </AppLayout>
  );
};

export default Profile;
