import React, { useEffect, useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import { useNavigate, Route, Routes } from "react-router-dom";
import { UserRegisterScreen } from "./screens/UserRegisterScreen";
import { UserLoginScreen } from "./screens/UserLoginScreen";
import { UserDashboard } from "./screens/UserDashboard/UserDashboard";
import { AuthApi } from "./api/authApi/AuthApi";
export const App = () => {
  const { Title } = Typography;
  const [isAuth, setIsAuth] = useState(
    sessionStorage.getItem("token") ? true : false
  );
  useEffect(() => {
    setIsAuth(sessionStorage.getItem("token") ? true : false);
  }, [sessionStorage.getItem("token")]);
  const navigate = useNavigate();
  const logout = () => {
    setIsAuth(false);
    const api = new AuthApi();
    api.logout();
    navigate("/login");
  };
  const login = () => {
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <div className="App">
      <Row align="middle" style={{ backgroundColor: "#000", height: "10vh" }}>
        <Col span={20}>
          <Title>
            <span style={{ color: "#fff" }}>Glucose-app is running!</span>
          </Title>
        </Col>
        <Col span={4}>
          <Button
            style={{ backgroundColor: "white", borderRadius: 0 }}
            onClick={() => {
              isAuth ? logout() : login();
            }}
          >
            {isAuth ? "Sair" : "Fazer login"}
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <Routes>
            {isAuth && <Route path="*" element={<UserDashboard />} />}
            <Route path="*" element={<UserLoginScreen />} />
            <Route path="/user_register" element={<UserRegisterScreen />} />
            <Route path="/login" element={<UserLoginScreen />} />
            {isAuth && <Route path="/dashboard" element={<UserDashboard />} />}
          </Routes>
        </Col>
      </Row>
    </div>
  );
};
