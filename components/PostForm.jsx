import { Button, Input } from "antd";
import Form from "antd/lib/form/Form";
import React, { useRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const imageInput = useRef();

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  });
  const onSubmit = () => {
    dispatch(addPost);
  };
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
    setText("");
  },[]);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>Upload Images</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          ZackZack
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          <div key={v.id} style={{ display: "inline-block" }}>
            <img src={v} alt="" style={{ width: "200px" }} alt={v} />
          </div>;
        })}
      </div>
    </Form>
  );
};

export default PostForm;
