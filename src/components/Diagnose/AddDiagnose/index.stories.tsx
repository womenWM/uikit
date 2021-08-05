import React from "react";
import AddDiagnose from './index';
import SearchHospital from '../../SearchHospital';
import SearchName from '../../SearchName';
import PatientEditBtn from '../../../components/EditBtn';
import { PlusOutlined } from '@ant-design/icons';
import '../_style.scss'
export default {
  title: "@Diagnose/AddDiagnose",
  component: AddDiagnose,
  parameters: {}
};

export const AddDiagnoseCom = () => {
  return (
    <AddDiagnose
      type="add"
      request={() => new Promise((resolve => resolve({})))}
      onSuccess={() => {}}
      patientSid="ccc"
      patientWcid="bbb"
      roleId="ddd"
      searchHospital={(form, initData) => (
        <SearchHospital
          requestFetchHospital={() => new Promise((resolve => resolve({organizationInfos: []})))}
          form={form}
          style={{ width: '376px' }}
          formItemName="hospital"
          requestAddHospital={() => new Promise((resolve => resolve({id: 'hospitalid'})))}
          requestFetchAddress={() => new Promise((resolve => resolve({regions: []})))}
        />
      )}
      searchDiagnose={(form) => (
        <SearchName
          request={() => new Promise((resolve => resolve({diseaseInfos: []})))}
          apiResProp="diseaseInfos"
          typelabel="诊断"
          typeName="diagnose"
          form={form}
        />
      )}
    ><PatientEditBtn text="添加诊断" icon={<PlusOutlined />} /></AddDiagnose>
  )
};
