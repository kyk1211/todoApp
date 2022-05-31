import styled from "@emotion/styled";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <Footer>
        Copyright © fsofwareengineer, {new Date().getFullYear()}
        {"."}
      </Footer>
    </div>
  );
}

const Footer = styled.footer({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
