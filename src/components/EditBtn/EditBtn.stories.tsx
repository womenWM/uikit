import React from "react";
import PatientEditBtn from './index';
import { EditFilled } from '@ant-design/icons';

export default {
  title: "@Components/EditBtn",
  component: PatientEditBtn,
  parameters: {}
};

export const EditBtn = () => (
  <PatientEditBtn icon={<EditFilled />} text="采集" />
);


