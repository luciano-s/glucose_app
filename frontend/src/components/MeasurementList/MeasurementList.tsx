import React from "react";
import { Col, Row, Table } from "antd";
import { IMeasurement } from "../../types";
import { Measurement } from "../Measurement";
import { Container } from "../../styled_components/Container";
interface IProps {
  measurements: Array<IMeasurement>;
}

export const MeasurementList: React.FC<IProps> = ({ measurements }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Glicemia",
      dataIndex: "glicemy",
      key: "glicemy",
    },
    { title: "Data", dataIndex: "timestamp", key: "timestamp" },
  ];
  const getColor = (value: number): string =>
    value <= 75 || value > 83 ? "#CC3333" : "#b75517";

  const formatedData = measurements.map((measurement) => ({
    ...measurement,
    glicemy: (
      <span style={{ color: getColor(measurement.glicemy) }}>
        {measurement.glicemy}
      </span>
    ),
  }));
  return (
    <Container>
      <Col span={24}>
        <Table dataSource={formatedData} columns={columns} />
      </Col>
    </Container>
  );
};
