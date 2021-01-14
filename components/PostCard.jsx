import { Avatar, Button, Card, Popover, List, Comment } from "antd";
import { PropTypes } from "prop-types";
import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  EllipsisOutlined,
  HeartOutlined,
  RetweetOutlined,
  MessageOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import ButtonGroup from "antd/lib/button/button-group";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const { me } = useSelector((state) => state.user);
  const id = me?.id; //Optional Chaining 연산자

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="like"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="like" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <ButtonGroup>
                {id && post.User.id === id ? (
                  <>
                    <Button>Edit</Button>
                    <Button type="danger">Delete</Button>
                  </>
                ) : (
                  <>
                    <Button>Report</Button>
                  </>
                )}
              </ButtonGroup>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          title={post.User.nickname}
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} comments`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.comment}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.obj,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
