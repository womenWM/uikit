import React from "react";
import BtnDel from './index';
import '../_style.scss';

export default {
  title: "@Diagnose/BtnDel",
  component: BtnDel,
  parameters: {}
};

export const Del = () => (
  <BtnDel
    id="test"
    sid="test"
    request={() => new Promise((resolve => resolve({regions: []})))}
    onSuccess={() => {}}
  />
);


