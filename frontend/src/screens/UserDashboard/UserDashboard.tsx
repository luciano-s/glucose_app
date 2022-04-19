import React, { useEffect, useState } from "react";
import { Col, Row, Tabs } from "antd";
import { RegisterGlucoseModal } from "../../components/RegisterGlucoseModal";
import { MeasurementApi } from "../../api/measurementApi/measurement";
import { IPaginatedListMeal, IMeasurement, IPacient } from "../../types";
import { MeasurementTable } from "../../components/MeasurementTable";
import { MealTable } from "../../components/MealTable";
import { RegisterMealModal } from "../../components/RegisterMealModal";
import { Container } from "../../styled_components/Container";
import { MealApi } from "../../api/mealApi/meal";
import { MealTableContainer } from "../../components/MealTableContainer";

interface IProps {
  pacient: IPacient | null;
}

export const UserDashboard: React.FC<IProps> = ({ pacient }) => {
  const [measurements, setMeasurements] = useState<Array<IMeasurement>>([]);
  const [shouldFetchMeasurement, setShouldFetchMeasurement] = useState(true);

  const { TabPane } = Tabs;

  useEffect(() => {
    if (pacient && shouldFetchMeasurement) {
      const getMeasurements = async () => {
        const api = new MeasurementApi();
        setMeasurements(
          await api.getAllMeasurements({
            pacient,
            filters: { pacient: pacient.id },
          })
        );
      };
      getMeasurements();
      setShouldFetchMeasurement(false);
    }
  }, [pacient, shouldFetchMeasurement]);



  return (
    <Row justify="center" style={{ marginTop: "64px" }}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Row justify="center" gutter={64}>
              <Col span={12}>
                <Row justify="center">
                  <Col>
                    {pacient && (
                      <RegisterGlucoseModal
                        pacient={pacient}
                        setShouldRefetch={(fetch: boolean) =>
                          setShouldFetchMeasurement(fetch)
                        }
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row justify="center">
                  <Col>
                    {pacient && (
                      <RegisterMealModal
                        pacient={pacient}
                        setShouldRefetch={(fetch: boolean) =>
                          ({})
                        }
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Container justify="center">
          <Col span={18}>
            <Tabs>
              <TabPane tab="Medições" key={1}>
                <MeasurementTable measurements={measurements} />
              </TabPane>
              <TabPane tab="Refeições" key={2}>
                {pacient && <MealTableContainer pacient={pacient} />}
              </TabPane>
            </Tabs>
          </Col>
        </Container>
      </Col>
    </Row>
  );
};
