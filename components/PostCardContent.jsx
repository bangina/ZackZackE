import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const PostCardContent = ({ postData }) => {
  // 정규표현식 사용
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((post, index) => {
        if (post.match(/(#[^\s#]+)/g)) {
          return (
            //사용자가 수정하면 index 섞일 수 있으나 어차피 수정하면 리렌더링 되기 때문에
            //이런 경우에는 상관 없음
            <Link href={`/hashtag/${post.slice(1)}`} key={index}>
              <a>{post}</a>
            </Link>
          );
        }
        return post;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
