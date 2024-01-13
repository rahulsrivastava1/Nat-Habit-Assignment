import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Protected from "./components/Protected";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Protected Component={Home} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
