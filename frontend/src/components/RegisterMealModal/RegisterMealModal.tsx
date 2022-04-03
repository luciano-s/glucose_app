import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  message,
  Modal,
  Select,
  Typography,
} from "antd";
import { Moment } from "moment";
import { MealApi } from "../../api/mealApi/meal";
import { formatDateTimeFromBRStdToApi } from "../../utils";
import { IPacient } from "../../types";

interface IFormData {
  ui: number;
  cho: number;
  glycemia: number;
  dateTime: string;
  mealType: string;
}

interface IProps {
  pacient: IPacient;
}

export const RegisterMealModal: React.FC<IProps> = ({ pacient }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    ui: 0,
    cho: 0,
    glycemia: -1,
    dateTime: "",
    mealType: "",
  });
  const mealTypes = [
    { key: "BREAKFAST", value: "Café da manhã" },
    { key: "LUNCH", value: "Almoço" },
    { key: "SNACK", value: "Lanche" },
    { key: "DINNER", value: "Jantar" },
  ];
  const showModal = () => setIsModalVisible(true);
  const { Title } = Typography;
  const { Option } = Select;
  const handleOk = async () => {
    console.log(formData);

    const api = new MealApi();
    const data = {
      type: formData.mealType,
      cho: formData.cho,
      measurement: {
        glycemia: formData.glycemia,
        timestamp: formatDateTimeFromBRStdToApi(formData.dateTime),
      },
      injection: {
        timestamp: formatDateTimeFromBRStdToApi(formData.dateTime),
        ui: formData.ui,
      },
    };

    const { status, msg } = await api.createMeal(data, pacient);

    if (status !== 201) {
      message.error(`Houve erros ao cadastrar a refeição: ${msg}`);
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
        <Title>Registrar refeição</Title>
      </Button>
      <Modal
        visible={isModalVisible}
        destroyOnClose
        onOk={() => handleOk()}
        onCancel={() => onCancel()}
      >
        <Form layout="vertical">
          <Form.Item label="Glicemia (mg/dl)" required>
            <InputNumber
              onChange={(value: number) =>
                setFormData((prev: IFormData) => ({ ...prev, glycemia: value }))
              }
            />
          </Form.Item>
          <Form.Item label="Unidades de insulina (UI)" required>
            <InputNumber
              min={0}
              onChange={(value: number) =>
                setFormData((prev: IFormData) => ({ ...prev, ui: value }))
              }
            />
          </Form.Item>
          <Form.Item label="Quantidade de carboidratos (em gramas)">
            <InputNumber
              min={0}
              onChange={(value: number) =>
                setFormData((prev: IFormData) => ({ ...prev, cho: value }))
              }
            />
          </Form.Item>
          <Form.Item label="Tipo de refeição" required>
            <Select
              style={{ width: "30%" }}
              defaultValue={mealTypes[0].value}
              onChange={(data) => {
                console.log(data);
                setFormData((prev: IFormData) => ({
                  ...prev,
                  mealType: data,
                }));
              }}
            >
              {mealTypes.map((mealType) => (
                <Option key={mealType.key}>{mealType.value}</Option>
              ))}
            </Select>
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
