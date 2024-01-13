import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const navigate = useNavigate();
  const { Component } = props;

  useEffect(() => {
    const isloggedin = localStorage.getItem("token");
    if (!isloggedin) {
      navigate("/login");
    }
  }, []);

  return <Component />;
};

export default Protected;
