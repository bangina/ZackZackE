import React, { useCallback } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";
import useInput from "../hooks/useInput";

const LoginForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [pw, onChangePw] = useInput("");

  const dispatch = useDispatch();

  const { isLoggingIn } = useSelector((state) => state.user);

  const onSubmitForm = useCallback(() => {
    // e.preventDefault() : antd에는 onFinish 속성 자체에 내장되어있음
    console.log(email, pw);
    dispatch(loginRequestAction({ email, pw }));
  }, [email, pw]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">Email</label>
        <br />
        <Input
          name="user-id"
          value={email}
          onChange={onChangeEmail}
          required
          type="email"
        />
      </div>
      <div>
        <label htmlFor="user-pw">PW</label>
        <br />
        <Input
          name="user-pw"
          type="password"
          value={pw}
          onChange={onChangePw}
          required
        />
      </div>
      {/* style에 인라인으로 {{객체}}를 생성  */}
      {/* 객체 !== 객체(같은 내용도 무조건 다름) */}
      {/* thus, 리렌더링시마다 객체 계속 생성(성능에 좋지 않은 영향) */}
      {/* ===> styled-component 사용한다  */}
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          Log In
        </Button>
        <Link href="/signup">
          <a>
            <Button>Sign Up</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default LoginForm;
