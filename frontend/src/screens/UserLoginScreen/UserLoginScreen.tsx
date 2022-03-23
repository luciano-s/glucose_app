import React from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { UserLoginForm } from "../../components/UserLoginForm";

export const UserLoginScreen = () => {
  return (
    <>
      <Row justify="center">
        <Col>
          <UserLoginForm />
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
