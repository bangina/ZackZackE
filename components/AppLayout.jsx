import React from "react";
import Link from "next/link";
import { Menu, Input, Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div>
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
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
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
    </div>
  );
};
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

export default AppLayout;
