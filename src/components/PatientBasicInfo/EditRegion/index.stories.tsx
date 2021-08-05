import React from "react";
import EditRegion from './index';
import { Form } from 'antd';

export default {
  title: "@PatientBasicInfo/EditRegion",
  component: EditRegion,
  parameters: {}
};

export const EditBtn = () => {
  const [form] = Form.useForm();
  return (
    <EditRegion
      request={() => new Promise((resolve => resolve({regions:[]})))}
      form={form}
      initFormVal={{}}
    />
  )
};
