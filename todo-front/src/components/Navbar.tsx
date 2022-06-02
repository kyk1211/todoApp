import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    window.localStorage.removeItem("todo-token");
    navigate("/login");
  };
  return (
    <Container>
      <h1>Todo</h1>
      <button onClick={handleClick}>{window.localStorage.getItem("todo-token") ? "SIGN OUT" : "SIGN IN"}</button>
    </Container>
  );
}

const Container = styled.header({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "10px 20px",
  backgroundColor: "darkslateblue",
  color: "white",
  height: "50px",
  h1: {
    margin: "0",
    height: "100%",
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    color: "white",
    height: "100%",
  },
});
