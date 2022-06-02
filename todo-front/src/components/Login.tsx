import styled from "@emotion/styled";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../libs/callApi";

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login();
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      await login();
    }
  };

  const login = async () => {
    const data = {
      email,
      password,
    };
    if (!email.trim() || !password.trim()) return;
    try {
      const res = await signin(data);
      const token = res.token;
      if (!token) return;
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit} onKeyDown={handleEnter}>
          <h2>로그인</h2>
          <input
            value={email}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"이메일을 입력하세요."}
            required={true}
          />
          <input
            value={password}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={"on"}
            placeholder={"비밀번호를 입력하세요."}
            required={true}
          />
          <button type="submit">로그인</button>
        </Form>
        <SignUpLink to={"/signup"}>회원가입</SignUpLink>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
});

const Wrapper = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "10px",
});

const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "300px",
  h2: {
    margin: "0",
  },
  input: {
    height: "30px",
    fontSize: "20px",
    "&:focus": {
      outline: "none",
    },
  },
  button: {
    border: "none",
    cursor: "pointer",
    height: "30px",
  },
  p: {
    margin: "0",
  },
});

const SignUpLink = styled(Link)({
  alignSelf: "flex-end",
});
