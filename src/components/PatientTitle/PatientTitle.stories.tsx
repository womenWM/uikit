import React from "react";
import PatientTitle from './index';


export default {
  title: "@Components/PatientTitle",
  component: PatientTitle,
  parameters: {}
};

export const Title = () => (
  <PatientTitle title="基本资料" />
);
