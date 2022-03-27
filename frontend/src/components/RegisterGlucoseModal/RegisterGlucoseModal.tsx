import React, { useState } from "react";
import { Button, DatePicker, Form, InputNumber, Modal, Typography } from "antd";
import { Moment } from "moment";

interface IFormData {
  glicemy: number;
  dateTime: string;
}

export const RegisterGlucoseModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    glicemy: -1,
    dateTime: "",
  });
  const showModal = () => setIsModalVisible(true);
  const { Title } = Typography;

  const handleOk = () => {
      const api = 
    console.log(formData);
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
                setFormData((prev: IFormData) => ({ ...prev, glicemy: value }))
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
