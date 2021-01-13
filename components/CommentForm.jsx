import { Button, Input } from "antd";
import { Form } from "antd";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.state);
  const [commentText, onChangeCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

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
          style={{ position: "absolute", right: 0, bottom: -40 }}
          type="primary"
          htmlType="submit"
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = { post: PropTypes.object.isRequired };
export default CommentForm;
