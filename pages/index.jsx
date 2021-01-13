import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>NodeBird</title>
      </Head>
      {isLoggedIn && <PostForm />}
      {/* map구문에서 index를 key로 쓰는 것은 안티패턴 중 하나 */}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
