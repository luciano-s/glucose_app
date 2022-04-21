import React from "react";
import { Col, Row, Tabs } from "antd";
import { RegisterGlucoseModal } from "../../components/RegisterGlucoseModal";
import { IPacient } from "../../types";
import { RegisterMealModal } from "../../components/RegisterMealModal";
import { Container } from "../../styled_components/Container";
import { MealTableContainer } from "../../components/MealTableContainer";
import { MeasurementTableContainer } from "../../components/MeasurementTableContainer";

interface IProps {
  pacient: IPacient | null;
}

export const UserDashboard: React.FC<IProps> = ({ pacient }) => {
  const { TabPane } = Tabs;

  return (
    <Row justify="center" style={{ marginTop: "64px" }}>
      <Col span={24}>
        {pacient && (
          <Row>
            <Col span={24}>
              <Row justify="center" gutter={64}>
                <Col span={12}>
                  <Row justify="center">
                    <Col>
                      <RegisterGlucoseModal
                        pacient={pacient}
                        setShouldRefetch={(fetch: boolean) => {}}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row justify="center">
                    <Col>
                      <RegisterMealModal
                        pacient={pacient}
                        setShouldRefetch={(fetch: boolean) => ({})}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        {pacient && (
          <Container justify="center">
            <Col span={18}>
              <Tabs>
                <TabPane tab="Medições" key={1}>
                  <MeasurementTableContainer pacient={pacient} />
                </TabPane>
                <TabPane tab="Refeições" key={2}>
                  <MealTableContainer pacient={pacient} />
                </TabPane>
              </Tabs>
            </Col>
          </Container>
        )}
      </Col>
    </Row>
  );
};
