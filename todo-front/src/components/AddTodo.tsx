import styled from "@emotion/styled";
import React, { useState } from "react";

interface Props {
  addfn: (item: Item) => void;
}

export default function AddTodo({ addfn }: Props) {
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(() => e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    if (input.trim() === "") return;
    addfn({ id: "", title: input, done: false });
    setInput(() => "");
  };

  return (
    <Container>
      <Input value={input} onChange={handleChange} onKeyUp={handleKeyDown} placeholder="Add Todo here" />
      <Btn onClick={handleClick}>+</Btn>
    </Container>
  );
}

const Container = styled.div({
  padding: "16px",
  width: "100%",
  height: "60px",
  boxSizing: "border-box",
  boxShadow: "0 1px 1px gray",
  marginBottom: "16px",
  borderRadius: "5px",
  display: "flex",
  gap: "10px",
});

const Input = styled.input({
  border: "none",
  flex: "1",
  borderBottom: "1px solid lightgray",
  "&:focus": {
    outline: "none",
  },
});

const Btn = styled.button({
  width: "70px",
  backgroundColor: "white",
  border: "1px solid pink",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "pink",
  },
});
