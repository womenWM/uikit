import React from "react";
import PatientEditInfo from './index';
import { Button, Form } from 'antd';
import EditRegion from '../EditRegion/index';

export default {
  title: "@PatientBasicInfo/EditInfo",
  component: PatientEditInfo,
  parameters: {}
};

const partientSubject = {
  age: 28,
  birthday: 767721600000,
  bmi: "27.68",
  height: 170,
  id: "test.4qM8y4",
  name: "用户677",
  sex: 1,
  tel: "17788556677",
  uuCode: "10002568",
  waistline: 26,
  weight: 80,
}
export const EditInfo = () => {
  const [form] = Form.useForm();
  return (
    <PatientEditInfo
      form={form}
      initFormVal={partientSubject}
      onSuccess={() => {}}
      request={() => new Promise((resolve => resolve(true)))}
      editRegion={
        <EditRegion
          request={() => new Promise((resolve => resolve({regions:[]})))}
          form={form}
          initFormVal={partientSubject}
        />
      }
    >
      <Button type="primary">采集</Button>
    </PatientEditInfo>
  )
};
