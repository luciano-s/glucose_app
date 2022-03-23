import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import { UserRegisterForm } from "../../components/UserRegisterForm";

export const UserRegisterScreen: React.FC = () => {
  return (
    <Row justify="center">
      <Col>
        <Row justify="center">
          <Col>
            <UserRegisterForm />
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Link to="/login">already have an account</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
