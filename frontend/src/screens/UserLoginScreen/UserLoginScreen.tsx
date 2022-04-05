import React, { useState } from "react";
import { Col, message, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserLoginForm } from "../../components/UserLoginForm";
import { AuthApi } from "../../api/authApi/AuthApi";
import { IPacient } from "../../types";

interface IProps {
  value: {
    pacient: IPacient | null;
    setPacient: (p: IPacient) => void;
  };
}

export const UserLoginScreen: React.FC<IProps> = ({ value }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [_, setCookie] = useCookies(["pacient"]);
  const { pacient } = value;
  const navigate = useNavigate();

  const api = new AuthApi();

  const onSubmit = async () => {
    const { status, data, errorMsg } = await api.login({
      email: loginData.email,
      password: loginData.password,
    });
    if (status !== 200)
      message.error(`Houve erros ao fazer login: ${errorMsg}`);

    if (data) {
      const { pacient, token } = data;
      setCookie("pacient", { ...pacient, token });
      navigate("/dashboard");
    }
  };

  const logout = async () => {
    if (pacient) {
      const { status, data } = await api.logout(pacient);
      status !== 200
        ? message.error(`Houve erros ao fazer logout: ${data}`)
        : navigate("/login");
    }
  };
  return (
    <>
      <Row justify="center">
        <Col>
          <UserLoginForm
            logout={logout}
            onSubmit={onSubmit}
            setData={setLoginData}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Link to="/user_register">don't have an account?</Link>
        </Col>
      </Row>
    </>
  );
};
