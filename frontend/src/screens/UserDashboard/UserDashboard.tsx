import React, { useEffect, useState } from "react";
import { Button, Col, Row, Tabs, Typography } from "antd";
import { RegisterGlucoseModal } from "../../components/RegisterGlucoseModal";
import { MeasurementApi } from "../../api/measurementApi/measurement";
import { IMeasurement, IPacient } from "../../types";
import { MeasurementTable } from "../../components/MeasurementTable";

interface IProps {
  pacient: IPacient | null;
}

export const UserDashboard: React.FC<IProps> = ({ pacient }) => {
  const { Title } = Typography;
  const [measurements, setMeasurements] = useState<Array<IMeasurement>>([]);
  const api = new MeasurementApi();
  const { TabPane } = Tabs;
  useEffect(() => {
    if (pacient) {
      const getMeasurements = async () =>
        setMeasurements(
          await api.getAllMeasurements({
            pacient,
            filters: { pacient: pacient.id },
          })
        );
      getMeasurements();
    }
  }, [pacient]);

  return (
    <Row justify="center" style={{ marginTop: "64px" }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row justify="center" gutter={64}>
              <Col span={12}>
                <Row justify="center">
                  <Col>
                    {pacient && <RegisterGlucoseModal pacient={pacient} />}
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row justify="center">
                  <Col>
                    <Button style={{ width: "400px", height: "200px" }}>
                      <Title>Registrar refeição</Title>
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Tabs>
          <TabPane tab="Medições" key={1}>
            <MeasurementTable measurements={measurements} />
          </TabPane>
          <TabPane tab="Refeições" key={2}>
            <p>tabela com refeições</p>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};
