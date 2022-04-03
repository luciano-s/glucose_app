import React from "react";
import { Button, Col, Form, Input, Row } from "antd";


interface IUserLoginForm {
  email: string;
  password: string;
}

interface IProps {
  onSubmit: () => void;
  logout: () => void;
  setData: (fn: (prevState: IUserLoginForm) => IUserLoginForm) => void;
}

export const UserLoginForm: React.FC<IProps> = ({
  logout,
  onSubmit,
  setData,
}) => {
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
                setData((prevState: IUserLoginForm) => ({
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
                setData((prevState: IUserLoginForm) => ({
                  ...prevState,
                  password: target.value,
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
