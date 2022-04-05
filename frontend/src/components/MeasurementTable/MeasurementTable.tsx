import React from "react";
import { Col, Row, Table } from "antd";
import { IMeasurement } from "../../types";
import { Container } from "../../styled_components/Container";
import { getColor } from "../../utils";
interface IProps {
  measurements: Array<IMeasurement>;
}

export const MeasurementTable: React.FC<IProps> = ({ measurements }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Glicemia",
      dataIndex: "glycemia",
      key: "glycemia",
    },
    { title: "Data", dataIndex: "timestamp", key: "timestamp" },
  ];

  const formatedData = measurements.map((measurement) => ({
    ...measurement,
    glycemia: (
      <span
        style={{
          color: getColor(measurement),
        }}
      >
        {measurement.glycemia}
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
