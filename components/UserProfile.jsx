import { Avatar, Button, Card } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducers/index";

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="following">
          팔로잉
          <br />0
        </div>,
        <div key="follower">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>Ina</Avatar>} title="Ina Bang"></Card.Meta>
      <Button onClick={onLogout}>Logout</Button>
    </Card>
  );
};

export default UserProfile;
