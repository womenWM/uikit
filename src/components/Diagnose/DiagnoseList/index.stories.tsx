import React from 'react';
import DiagnoseList from './index';
import HospitalPopover from '../HospitalPopover';
import BtnDel from '../BtnDel';
import AddDiagnose from '../AddDiagnose';
import SearchHospital from '../../SearchHospital';
import SearchName from '../../SearchName';

export default {
  title: '@Diagnose/DiagnoseList',
  component: DiagnoseList,
  parameters: {}
}
// ~~~~~~~~~~~~~~~7.13 诊断列表uikit完事，还没暴露方法，未发布，doctor还没有使用
const request = () => new Promise((resolve) => resolve(true));
const hospital = { hospitalName: '阜外医院', hospitalId: 'fdfd' }
const addDiagnostProps = {
  onSuccess: () => {},
  patientSid: 'sid',
  patientWcid: 'wcid',
  roleId:'roleId',
};
const searchHospitalProps = {
  requestFetchHospital: request,
  style: { width: '376px' },
  formItemName: 'hospital',
  requestAddHospital:request,
  requestFetchAddress: request,
};
const searchNameProps = {
  request: request,
  apiResProp: 'diseaseInfos',
  typelabel: '诊断',
  typeName: 'diagnose',
};

const diagnosisList = [
      {
          "sid": "dev.v4RJw4",
          "id": "dev.L03OP0",
          "diseaseId": "dev.eJg5N0",
          "name": "左位心",
          "attachedInfo": {
              "hospitalId": "dev.eKVja4",
              "hospitalName": "北京大学第三医院（北医三院）",
              "diagnosisAt": 1580918400000
          }
      },
      {
          "sid": "dev.v4RJw4",
          "id": "dev.keaAOe",
          "diseaseId": "dev.09mYx0",
          "name": "高血压",
          "attachedInfo": {
              "diagnosisAt": 1516876600897
          }
      },
      {
          "sid": "dev.v4RJw4",
          "id": "dev.jW2qn0",
          "diseaseId": "dev.exqEA0",
          "name": "高血脂",
          "attachedInfo": {
              "diagnosisAt": 1579948600897
          }
      }
  ]
export const list = () => (
  <DiagnoseList
    patientWcid="cc"
    sid="aa"
    reloadList={true}
    request={() => new Promise((resolve) => resolve({diagnosisList}))}
    onSuccess={() => {}}
    hospitalCom={
      (hospital) => <HospitalPopover attachedInfo={hospital} request={() => new Promise((resolve => resolve({regions: []})))} />
    }
    btnDelCom={
      (id) => (
        <BtnDel
          id={id}
          sid="sid"
          request={() => new Promise((resolve => resolve({regions: []})))}
          onSuccess={() => {}}
        />
      )
    }
    editDiagnoseCom={
      (initData) => (
        <AddDiagnose
          {...addDiagnostProps}
          type="add"
          request={request}
          initData={initData}
          searchHospital={(formInstance) => (
            <SearchHospital
              {...searchHospitalProps}
              form={formInstance}
            />
          )}
          searchDiagnose={(formInstance) => (
            <SearchName
              {...searchNameProps}
              form={formInstance}
            />
          )}
        >
          <span>编辑</span>
        </ AddDiagnose>
      )
    }
  />
)
