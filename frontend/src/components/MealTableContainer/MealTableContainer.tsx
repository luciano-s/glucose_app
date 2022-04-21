import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { MealTable } from "../MealTable/MealTable";
import { MealApi } from "../../api/mealApi/meal";
import { formatOrder } from "../../utils";
import { IListMeal, IPacient } from "../../types";

export const MealTableContainer: React.FC<{ pacient: IPacient }> = ({
  pacient,
}) => {
  const [meals, setMeals] = useState<IListMeal[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 100,
  });
  const [order, setOrder] = useState({ field: "", order: "" });
  
  useEffect(() => {
    const getMeals = async () => {
      const api = new MealApi();
      const data = await api.getAllMeals({
        pacient,
        filters: {
          ordering: formatOrder(order),
          page: pagination.page,
          page_size: pagination.pageSize,
        },
      });
      const pag = {
        pageSize: data.pageSize,
        total: data.total,
      };
      setMeals(data.results);
      setPagination((prev) => ({ ...prev, ...pag }));
    };
    getMeals();
  }, [order, pacient, pagination.page]);

  const handleChange = (
    pagination: { current: number; pageSize: number; total: number },
    filters: any,
    sorter: { field: string; order: string }
  ) => {
    setPagination(() => ({ page: pagination.current, ...pagination }));
    setOrder(() => ({ ...sorter }));
  };
  return (
    <Row>
      <Col span={24}>
        <MealTable
          handleChange={handleChange}
          meals={meals}
          pagination={pagination}
        />
      </Col>
    </Row>
  );
};
