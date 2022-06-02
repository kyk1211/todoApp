import styled from "@emotion/styled";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../libs/callApi";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail || !validateName || !validatePassword) return;
    try {
      await signup({ username, password, email });
      setUsername("");
      setPassword("");
      setEmail("");
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const validateName = useMemo(() => {
    if (username && !username.trim()) {
      return false;
    }
    return true;
  }, [username]);

  const validateEmail = useMemo(() => {
    if (email && !email.trim()) {
      return false;
    }
    return true;
  }, [email]);

  const validatePassword = useMemo(() => {
    if (password !== checkPassword) {
      return false;
    }
    return true;
  }, [checkPassword, password]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>계정 생성</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} autoFocus placeholder="username" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type={"email"} placeholder="email" />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          placeholder="password"
        />
        <input
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
          type={"password"}
          placeholder="check password"
        />
        {validatePassword ? "" : <p>비밀번호가 다릅니다.</p>}
        <button>회원가입</button>
      </Form>
    </Container>
  );
}
const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
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
