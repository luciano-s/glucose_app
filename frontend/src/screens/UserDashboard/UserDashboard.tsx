import React from "react";
import { Button, Col, Row, Typography } from "antd";
import { RegisterGlucoseModal } from "../../components/RegisterGlucoseModal";

export const UserDashboard = () => {
  const { Title } = Typography;
  return (
    <Row justify="center" style={{ marginTop: "64px" }}>
      <Col span={24}>
        <Row justify="center" gutter={64}>
          <Col span={12}>
            <Row justify="center">
              <Col>
                <RegisterGlucoseModal />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row justify="center">
              <Col>
                <Button style={{ width: "400px", height: "200px" }}>
                  <Title>Registrar refeição</Title>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
