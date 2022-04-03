import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { RegisterUserApi } from "../../api/authApi/RegisterUserApi";

interface IUserRegisterForm {
  email: string;
  passwd: string;
  passwdConfirmation: string;
  firstName: string;
  lastName: string;
}

export const UserRegisterForm = () => {
  const [formData, setFormData] = useState<IUserRegisterForm>({
    email: "",
    passwd: "",
    passwdConfirmation: "",
    firstName: "",
    lastName: "",
  });

  const onSubmit = () => {
    const api = new RegisterUserApi();
    api.createUser({
      email: formData.email,
      password: formData.passwd,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill up the name!",
              },
            ]}
          >
            <Input
              onChange={({ target }) =>
                setFormData((prevState) => ({
                  ...prevState,
                  firstName: target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please fill up the last last name!",
              },
            ]}
          >
            <Input
              onChange={({ target }) =>
                setFormData((prevState) => ({
                  ...prevState,
                  lastName: target.value,
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
          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please, fill up the password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              onChange={({ target }) =>
                setFormData((prevState) => ({
                  ...formData,
                  passwdConfirmation: target.value,
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
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
