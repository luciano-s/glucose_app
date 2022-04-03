import React from "react";
import { Col, Row, Typography } from "antd";
import { IMeasurement } from "../../types";

interface IProps {
  measurement: IMeasurement;
}
export const Measurement: React.FC<IProps> = ({ measurement }) => {
  const { Title } = Typography;
  return (
    <Row>
      <Col span={10}>
        <Title level={3}>Glicemia: {measurement.glycemia}</Title>
      </Col>
      <Col span={14}>
        <Title level={4}>Data: {measurement.timestamp}</Title>
      </Col>
    </Row>
  );
};
