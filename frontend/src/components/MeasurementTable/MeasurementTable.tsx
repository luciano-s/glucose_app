import React from "react";
import { Col, Table } from "antd";
import { IMeasurement, IPagination } from "../../types";
import { Container } from "../../styled_components/Container";
import { getColor } from "../../utils";

interface IProps {
  measurements: Array<IMeasurement>;
  pagination: IPagination;
  handleChange: (pagination: any, filters: any, sorter: any) => void;
}

export const MeasurementTable: React.FC<IProps> = ({
  measurements,
  pagination,
  handleChange,
}) => {
  const columns = [
    {
      title: "Glicemia",
      dataIndex: "glycemia",
      key: "glycemia",
      render: (glycemia: number, measurement: IMeasurement) => (
        <span style={{ color: getColor(measurement) }}>{glycemia}</span>
      ),
      sorter: true,
    },
    {
      title: "Data",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: true,
    },
  ];

  return (
    <Container>
      <Col span={24}>
        <Table
          dataSource={measurements}
          columns={columns}
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
          }}
          onChange={handleChange}
        />
      </Col>
    </Container>
  );
};
