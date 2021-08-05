import React from "react";
import HospitalPopoverCom from './index';
import '../_style.scss';

export default {
  title: "@Diagnose/HospitalPopover",
  component: HospitalPopoverCom,
  parameters: {}
};

export const HospitalPopover = () => (
  <HospitalPopoverCom
    attachedInfo={{hospitalName: '阜外医院', hospitalId: 'aiked3'}}
    request={() => new Promise((resolve => resolve({organizationInfos: [{
      province:'北京', district: '西城区', address: '北京市西城区北礼士路167号', name: '阜外医院', city: '北京市',
    }]})))}
  />
);
