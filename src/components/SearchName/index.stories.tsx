import React from "react";
import SearchName from './index';
import { Form } from 'antd';
// import '../_style.scss';

export default {
  title: "@Components/SearchName",
  component: SearchName,
  parameters: {}
};
export const SearchNameCom = () => {
  const [form] = Form.useForm();
  return (
    <SearchName
      request={() => new Promise((resolve => resolve({diseaseInfos: []})))}
      apiResProp="diseaseInfos"
      typelabel="诊断"
      typeName="diagnose"
      form={form}
    />
  )
};


