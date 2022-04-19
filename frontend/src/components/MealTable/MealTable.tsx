import React from "react";
import { Col, Table } from "antd";
import { Container } from "../../styled_components/Container";
import { IListMeal } from "../../types";
import { getColor } from "../../utils";

interface IProps {
  meals: Array<IListMeal>;
  handleChange: (pagination: any, filters: any, sorter: any) => void;
  pagination: { page: number; pageSize: number; total: number };
}

export const MealTable: React.FC<IProps> = ({
  meals,
  handleChange,
  pagination,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Glicemia",
      dataIndex: "glycemia",
      key: "glycemia",
      render: (glycemia: number, meal: any) => (
        <span style={{ color: getColor(meal.measurement) }}>{glycemia}</span>
      ),
      sorter: true,
    },
    {
      title: "Data da refeição",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: true,
    },
    {
      title: "Refeição",
      dataIndex: "meal",
      key: "meal",
      sorter: true,
      filters: [
        { text: "Almoço", value: "LUNCH" },
        { text: "Café da Manhã", value: "BREAKFAST" },
        { text: "Jantar", value: "DINNER" },
        { text: "Lanche", value: "SNACK" },
      ],
    },
    {
      title: "Carboidratos (g)",
      dataIndex: "cho",
      key: "cho",
      sorter: true,
    },
    {
      title: "UI",
      dataIndex: "ui",
      key: "ui",
      sorter: true,
    },
    {
      title: "Data da aplicação",
      dataIndex: "uiTimestamp",
      key: "uiTimestamp",
      sorter: true,
    },
  ];
  const formatedMeals = meals.map((meal) => ({
    id: meal.id,
    glycemia: meal.measurement.glycemia,
    cho: meal.cho,
    timestamp: meal.measurement.timestamp,
    meal: meal.type,
    ui: meal.injection.ui,
    uiTimestamp: meal.injection.timestamp,
    measurement: meal.measurement,
  }));
  console.log(pagination);
  return (
    <Container>
      <Col span={24}>
        <Table
          dataSource={formatedMeals}
          rowKey={(record) => record.id}
          columns={columns}
          onChange={handleChange}
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
          }}
        />
      </Col>
    </Container>
  );
};
