import React from "react";
import { Form, Input } from "antd";

const NicknameEditForm = () => {
  return (
    <Form>
      <Input.Search addonBefore="Name" enterButton="edit" />
    </Form>
  );
};

export default NicknameEditForm;
