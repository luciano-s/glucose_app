import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { MealTable } from "../MealTable/MealTable";
import { MealApi } from "../../api/mealApi/meal";
import { formatOrder } from "../../utils";
import {
  IAntdPagination,
  IListMeal,
  IPacient,
  IPagination,
  ISorter,
} from "../../types";

export const MealTableContainer: React.FC<{ pacient: IPacient }> = ({
  pacient,
}) => {
  const [meals, setMeals] = useState<IListMeal[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
    total: 100,
  });
  const [order, setOrder] = useState<ISorter>({ field: "", order: "" });

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
      setMeals(() => data.results);
      setPagination((prev) => ({ ...prev, ...pag }));
    };
    getMeals();
  }, [order, pacient, pagination.page]);

  const handleChange = (
    pagination: IAntdPagination,
    filters: any,
    sorter: ISorter
  ) => {
    setPagination(() => ({
      page: pagination.current,
      total: pagination.total,
      pageSize: pagination.total,
    }));
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
