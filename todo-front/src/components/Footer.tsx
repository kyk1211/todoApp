import styled from "@emotion/styled";
import React from "react";

export default function Footer() {
  return (
    <Content>
      Copyright © fsofwareengineer, {new Date().getFullYear()}
      {"."}
    </Content>
  );
}

const Content = styled.footer({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
