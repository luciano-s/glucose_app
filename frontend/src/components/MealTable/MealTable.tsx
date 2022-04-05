import React from "react";
import { Col, Table } from "antd";
import { Container } from "../../styled_components/Container";
import { IListMeal } from "../../types";
import { getColor } from "../../utils";
interface IProps {
  meals: Array<IListMeal>;
}

export const MealTable: React.FC<IProps> = ({ meals }) => {
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
    { title: "Data da refeição", dataIndex: "timestamp", key: "timestamp" },
    { title: "Refeição", dataIndex: "meal", key: "meal" },
    { title: "UI", dataIndex: "ui", key: "ui" },
    {
      title: "Data da aplicação",
      dataIndex: "uiTimestamp",
      key: "uiTimestamp",
    },
  ];
  const formatedMeals = meals.map((meal) => ({
    id: meal.id,
    glycemia: (
      <span style={{ color: getColor(meal.measurement) }}>
        {meal.measurement.glycemia}
      </span>
    ),
    timestamp: meal.measurement.timestamp,
    meal: meal.type,
    ui: meal.injection.ui,
    uiTimestamp: meal.injection.timestamp,
  }));

  return (
    <Container>
      <Col span={24}>
        <Table dataSource={formatedMeals} columns={columns} />
      </Col>
    </Container>
  );
};
