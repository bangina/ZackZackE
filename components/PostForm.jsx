import { Button, Input } from "antd";
import Form from "antd/lib/form/Form";
import React, { useRef, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const { imagePaths, isPostAdded } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput();
  const imageInput = useRef();

  const onSubmit = () => {
    dispatch(addPost());
  };
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [text]);

  useEffect(() => {
    // onSubmit에서 dispatch랑 같이 text초기화 해주면 안 됨!!
    // WHAT IF 서버에서 요청 받았는데 문제 생겨서 처리가 안 되면??
    // 아직 텍스트 초기화 시키면 안 되지~~
    // isPostAdded됐을 때 초기화 한다!
    if (isPostAdded) {
      setText("");
    }
  }, [isPostAdded]);
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
