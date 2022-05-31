import styled from "@emotion/styled";
import React, { useState } from "react";

interface Props {
  item: Item;
  deletefn: () => void;
  updateItem: (item: Item) => void;
}

export default function Todo({ item, deletefn, updateItem }: Props) {
  const [readOnly, setReadOnly] = useState(true);
  const [titleInput, setTitleInput] = useState(item.title);

  const handleCheckBoxClick = () => {
    updateItem({ ...item, done: !item.done });
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && titleInput !== item.title) {
      updateItem({ ...item, title: titleInput });
    }
    setReadOnly(true);
  };

  return (
    <Container className="Todo">
      <CheckBox type={"checkbox"} id={item.id} name={item.id} checked={item.done} onClick={handleCheckBoxClick} />
      <Label id={item.id} onClick={() => setReadOnly(false)}>
        {readOnly ? (
          item.title
        ) : (
          <Input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={() => {
              setTitleInput(item.title);
              setReadOnly(true);
            }}
            onKeyUp={handleInputEnter}
          />
        )}
      </Label>
      <Btn onClick={deletefn}>delete</Btn>
    </Container>
  );
}
const Container = styled.div({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  gap: "20px",
  height: "50px",
});

const CheckBox = styled.input({
  height: "30px",
  width: "30px",
  margin: "0",
});

const Input = styled.input({
  "&:focus": {
    outline: "none",
  },
  border: "none",
  height: "100%",
  fontSize: "20px",
});

const Label = styled.label({
  fontSize: "20px",
  display: "flex",
});

const Btn = styled.button({
  marginLeft: "auto",
  height: "40px",
});
