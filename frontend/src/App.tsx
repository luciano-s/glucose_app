import React from "react";
import { Col, Row } from "antd";
import { Route, Routes } from "react-router-dom";
import { UserRegisterScreen } from "./screens/UserRegisterScreen";
import { UserLoginScreen } from "./screens/UserLoginScreen";
export const App = () => {
  return (
    <div className="App">
      <Row justify="center" style={{ backgroundColor: "#000" }}>
        <Col>
          <h1>
            <span style={{ color: "#fff" }}>Glucose-app is running!</span>
          </h1>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Routes>
            <Route path="/user_register" element={<UserRegisterScreen />} />
            <Route path="/login" element={<UserLoginScreen />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
};
