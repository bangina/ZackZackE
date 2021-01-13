import React from "react";
import Link from "next/link";
import { Menu, Input, Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>
              <b>ZackZackE</b>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <SearchInput />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>
              <Button>Sign Up</Button>
            </a>
          </Link>
        </Menu.Item>
      </Menu>
      {/* gutter : 컬럼사이의 간격 */}
      <Row gutter={8}>
        {/* n/24 */}
        <Col xs={24} md={6}>
          {/* 내 정보가 있으면(loggedIn과 같음) */}
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="github.com/bangina"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by Ina Bang
          </a>
        </Col>
      </Row>
    </>
  );
};
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
const Global = createGlobalStyle`
.ant-row{
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.ant-col:first-child{
  padding-left: 0 !important;
}
.ant-col:last-child{
  padding-right: 0 !important;
}`;
export default AppLayout;
