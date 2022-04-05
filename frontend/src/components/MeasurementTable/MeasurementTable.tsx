import React from "react";
import moment from "moment";
import { Col, Table } from "antd";
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
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: "Glicemia",
      dataIndex: "glycemia",
      key: "glycemia",
      render: (glycemia: number, measurement: IMeasurement) => (
        <span style={{ color: getColor(measurement) }}>{glycemia}</span>
      ),
      sorter: (a: { glycemia: number }, b: { glycemia: number }) =>
        a.glycemia - b.glycemia,
    },
    {
      title: "Data",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: (a: IMeasurement, b: IMeasurement) => {
        const comp =
          moment(a.timestamp, "DD-MM-YYYY HH:mm").toDate() >
          moment(b.timestamp, "DD-MM-YYYY HH:mm").toDate();
        switch (comp) {
          case true:
            return 1;
          default:
            return 0;
        }
      },
    },
  ];

  return (
    <Container>
      <Col span={24}>
        <Table dataSource={measurements} columns={columns} />
      </Col>
    </Container>
  );
};
