import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Avatar, Button, Col, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { UserRegisterScreen } from "./screens/UserRegisterScreen";
import { UserLoginScreen } from "./screens/UserLoginScreen";
import { UserDashboard } from "./screens/UserDashboard/UserDashboard";
import { IPacient } from "./types";
import { pacientContext } from "./context/pacientContext";

export const App = () => {
  const { Title } = Typography;
  const [authPacient, setAuthPacient] = useState<IPacient | null>(null);
  const [cookies, setCookies] = useCookies(["pacient"]);

  useEffect(() => {
    if (cookies.pacient) {
      setAuthPacient(cookies.pacient);
    }
  }, [cookies]);

  const navigate = useNavigate();

  return (
    <pacientContext.Provider
      value={{
        pacient: authPacient,
        setPacient: (p: IPacient) => setAuthPacient(p),
      }}
    >
      <div className="App">
        <Row align="middle" style={{ backgroundColor: "#000", height: "10vh" }}>
          <Col span={20}>
            <Title>
              <span style={{ color: "#fff" }}>Glucose-app is running!</span>
            </Title>
          </Col>
          <Col span={4}>
            <Button
              onClick={() => {
                if (authPacient) {
                  setCookies("pacient", null);
                  setAuthPacient(null);
                }
                navigate("/login");
              }}
            >
              {authPacient ? "Logout" : "Login"}
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <pacientContext.Consumer>
            {(value) => (
              <Col span={24}>
                <Routes>
                  {authPacient && (
                    <Route
                      path="*"
                      element={<UserDashboard pacient={authPacient} />}
                    />
                  )}
                  <Route path="*" element={<UserLoginScreen value={value} />} />
                  <Route
                    path="/user_register"
                    element={<UserRegisterScreen />}
                  />
                  <Route
                    path="/login"
                    element={<UserLoginScreen value={value} />}
                  />
                  {authPacient && (
                    <Route
                      path="/dashboard"
                      element={<UserDashboard pacient={authPacient} />}
                    />
                  )}
                </Routes>
              </Col>
            )}
          </pacientContext.Consumer>
        </Row>
      </div>
    </pacientContext.Provider>
  );
};
