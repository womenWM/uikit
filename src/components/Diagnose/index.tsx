import { FC } from 'react';
import AddDiagnose, { AddDiagnoseProps } from './AddDiagnose/index';
import BtnDel, { BtnDelProps } from './BtnDel/index';
import HospitalPopover, { HospitalPopoverProps } from './HospitalPopover/index';
import DiagnoseList, { DiagnoseListProps } from './DiagnoseList/index';

export type IPatientDiagnoseComponent = {
  AddDiagnose: FC<AddDiagnoseProps>,
  BtnDel: FC<BtnDelProps>
  HospitalPopover: FC<HospitalPopoverProps>,
  DiagnoseList: FC<DiagnoseListProps>,
}
const Diagnose: IPatientDiagnoseComponent = {
  AddDiagnose,
  BtnDel,
  HospitalPopover,
  DiagnoseList,
};

export default Diagnose;
