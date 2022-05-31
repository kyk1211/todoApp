import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import Layout from "../components/Layout";
import Login from "../components/Login";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
