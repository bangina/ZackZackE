import { Button, Input } from "antd";
import { Form } from "antd";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import { useDispatch } from "react-redux";

const CommentForm = ({ post }) => {
  const { id, isCommentAdded, isCommentAdding } = useSelector(
    (state) => state.post
  );
  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  const dispatch = useDispatch();
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  useEffect(() => {
    if (isCommentAdded) {
      setCommentText("");
    }
  }, [isCommentAdded]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          onChange={onChangeCommentText}
          value={commentText}
          rows={4}
          style={{ position: "relative", margin: 0 }}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={isCommentAdding}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = { post: PropTypes.object.isRequired };
export default CommentForm;
