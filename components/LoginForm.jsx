import React, { useState, useCallback } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers/index";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const dispatch = useDispatch();

  // USECALLBACK : 자식에게 passdown하는 콜백함수는 최적화를 위해 usecallback 사용한다
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePw = useCallback((e) => {
    setPw(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    // e.preventDefault() : antd에는 onFinish 속성 자체에 내장되어있음
    console.log(id, pw);
    dispatch(loginAction(id, pw));
  }, [id, pw]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
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
        <Button type="primary" htmlType="submit" loading={false}>
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
