import React from "react";
import SearchHospital from './index';
import { Form } from 'antd';
import '../../styles/index.scss';

export default {
  title: "@Components/SearchHospital",
  component: SearchHospital,
  parameters: {}
};

export const Del = () => {
  const [form] = Form.useForm();
  return (
    <SearchHospital
      requestFetchHospital={() => new Promise((resolve => resolve({organizationInfos: []})))}
      form={form}
      style={{ width: '376px' }}
      formItemName="hospital"
      requestAddHospital={() => new Promise((resolve => resolve({id: 'hospitalid'})))}
      requestFetchAddress={() => new Promise((resolve => resolve({regions: []})))}
    />
  )
};


