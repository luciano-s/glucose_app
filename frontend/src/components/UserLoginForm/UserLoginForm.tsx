import React, { useState } from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import { AuthApi } from "../../api/authApi/AuthApi";
import { useNavigate } from "react-router-dom";

interface IUserLoginForm {
  email: string;
  passwd: string;
}

export const UserLoginForm = () => {
  const [formData, setFormData] = useState<IUserLoginForm>({
    email: "",
    passwd: "",
  });
  const navigate = useNavigate()
  const api = new AuthApi();

  const onSubmit = async () => {
    const { status, msg } = await api.login({
      email: formData.email,
      password: formData.passwd,
    });
    if (status !== 200) {
      message.error(`Houve erros ao fazer login: ${msg}`);
    } else {
      console.log("should navigate");
      navigate("/dashboard");
    }
  };

  const logout = async () => {
    const { status, msg } = await api.logout();
    if (status !== 200) {
      message.error(`Houve erros ao fazer logout: ${msg}`);
    }
  };
  return (
    <Row style={{ margin: "16px" }} justify="center">
      <Col>
        <Form name="basic" layout="vertical">
          <Form.Item
            label="E-mail"
            name="e-mail"
            rules={[
              {
                type: "email",
                message: "The input must be a valid e-mail",
              },
              {
                required: true,
                message: "Please fill up the email!",
              },
            ]}
          >
            <Input
              onChange={({ target }) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: target.value,
                }))
              }
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please, fill up the password!",
              },
            ]}
          >
            <Input.Password
              onChange={({ target }) =>
                setFormData((prevState) => ({
                  ...prevState,
                  passwd: target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item>
            <Row justify="center">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => onSubmit()}
                >
                  Login
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row justify="center">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
