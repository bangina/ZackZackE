import { Checkbox, Input, Button } from "antd";
import Form from "antd/lib/form/Form";
import Head from "next/head";
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";

const Signup = () => {
  // const [input, setInput] = useState('');
  const [id, onChangeId] = useInput("");
  const [pw, onChangePw] = useInput("");
  const [nickname, onChangeNickname] = useInput("");

  //pw check는 콜백에서 "중복체크"도 해줘야 해서 useInput 훅을 사용하지 못 함
  const [pwCheck, setPwCheck] = useState("");
  const [pwError, setPwError] = useState(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const onChangePwCheck = useCallback((e) => {
    setPwCheck(e.target.value);
    setPwError(e.target.value !== pw);
  });

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked); //false
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    //제출할 때 한번 더 유효성 체크!
    if (pw !== pwCheck) {
      return setPwError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, pw, nickname);
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>Sign up | ZackZackE</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-id">Nickname</label>
          <br />
          <Input
            name="user-id"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </div>
        <div>
          <label htmlFor="user-pw">Password</label>
          <br />
          <Input
            name="user-pw"
            value={pw}
            onChange={onChangePw}
            required
            type="password"
          />
        </div>
        <div>
          <label htmlFor="user-pwcheck">Password Check</label>
          <br />
          <Input
            name="user-pwcheck"
            value={pwCheck}
            onChange={onChangePwCheck}
            required
            type="password"
          />
          {pwError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의해주세요.</ErrorMessage>}
        </div>
        <div>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

const ErrorMessage = styled.div`
  color: red;
`;

export default Signup;
