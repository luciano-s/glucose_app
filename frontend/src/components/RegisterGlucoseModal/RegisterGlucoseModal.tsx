import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  message,
  Modal,
  Typography,
} from "antd";
import { Moment } from "moment";
import { MeasurementApi } from "../../api/measurementApi/measurement";
import { formatDateTimeFromBRStdToApi } from "../../utils";
import { IPacient } from "../../types";

interface IFormData {
  glycemia: number;
  dateTime: string;
}

interface IProps {
  pacient: IPacient;
}

export const RegisterGlucoseModal: React.FC<IProps> = ({ pacient }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    glycemia: -1,
    dateTime: "",
  });

  const showModal = () => setIsModalVisible(true);
  const { Title } = Typography;
  const handleOk = async () => {
    console.log("MeasurementApi");
    const api = new MeasurementApi();
    const data = {
      glycemia: formData.glycemia,
      timestamp: formatDateTimeFromBRStdToApi(formData.dateTime),
    };

    const { status, msg } = await api.createMeasurement({ data, pacient });

    if (status !== 201) {
      message.error(`Houve erros ao cadastrar a glicemia: ${msg}`);
    }
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        onClick={() => showModal()}
        style={{ width: "400px", height: "200px" }}
      >
        <Title>Registrar glicemia</Title>
      </Button>
      <Modal
        visible={isModalVisible}
        destroyOnClose
        onOk={() => handleOk()}
        onCancel={() => onCancel()}
      >
        <Form layout="vertical">
          <Form.Item label="Glicemia (mg/dl)">
            <InputNumber
              onChange={(value: number) =>
                setFormData((prev: IFormData) => ({ ...prev, glycemia: value }))
              }
            />
          </Form.Item>
          <Form.Item label="Data">
            <DatePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              onChange={(dateTime: Moment | null, dateTimeString: string) =>
                setFormData((prev: IFormData) => ({
                  ...prev,
                  dateTime: dateTimeString,
                }))
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
