import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { MeasurementTable } from "../MeasurementTable/MeasurementTable";
import {
  IAntdPagination,
  IMeasurement,
  IPacient,
  IPagination,
  ISorter,
} from "../../types";
import { MeasurementApi } from "../../api/measurementApi/measurement";
import { formatOrder } from "../../utils";

export const MeasurementTableContainer: React.FC<{ pacient: IPacient }> = ({
  pacient,
}) => {
  const [measurements, setMeasurements] = useState<IMeasurement[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
    total: 100,
  });
  const [order, setOrder] = useState<ISorter>({ field: "", order: "" });

  useEffect(() => {
    const getMeasurements = async () => {
      const api = new MeasurementApi();
      const data = await api.getAllMeasurements({
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
      setMeasurements(() => data.results);
      setPagination((prev) => ({ ...prev, ...pag }));
    };
    getMeasurements();
  }, [pagination.page, pagination.pageSize, pacient, order]);

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
        <MeasurementTable
          measurements={measurements}
          pagination={pagination}
          handleChange={handleChange}
        />
      </Col>
    </Row>
  );
};
