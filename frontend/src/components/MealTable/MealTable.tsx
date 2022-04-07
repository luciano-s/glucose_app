import React from "react";
import moment from "moment";
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
      sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: "Glicemia",
      dataIndex: "glycemia",
      key: "glycemia",
      render: (glycemia: number, meal: any) => (
        <span style={{ color: getColor(meal.measurement) }}>{glycemia}</span>
      ),
      sorter: (a: { glycemia: number }, b: { glycemia: number }) =>
        a.glycemia - b.glycemia,
    },
    {
      title: "Data da refeição",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: (a: { timestamp: string }, b: { timestamp: string }) => {
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
    {
      title: "Refeição",
      dataIndex: "meal",
      key: "meal",
      sorter: (a: { meal: string }, b: { meal: string }) => {
        if (a.meal < b.meal) return -1;
        if (a.meal > b.meal) return 1;
        return 0;
      },
    },
    {
      title: "Carboidratos (g)",
      dataIndex: "cho",
      key: "cho",

      sorter: (a: { cho: number }, b: { cho: number }) => a.cho - b.cho,
    },
    {
      title: "UI",
      dataIndex: "ui",
      key: "ui",
      sorter: (a: { ui: number }, b: { ui: number }) => a.ui - b.ui,
    },
    {
      title: "Data da aplicação",
      dataIndex: "uiTimestamp",
      key: "uiTimestamp",
      sorter: (a: { timestamp: string }, b: { timestamp: string }) => {
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

  return (
    <Container>
      <Col span={24}>
        <Table dataSource={formatedMeals} columns={columns} />
      </Col>
    </Container>
  );
};
