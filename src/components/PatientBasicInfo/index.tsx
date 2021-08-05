import { FC } from 'react';
import Info, { InfoProps } from './Info';
import EditInfo, { EditInfoProps } from './EditInfo';
import EditRegion, { EditRegionProps } from './EditRegion';

export type IPatientBasicComponent = {
  Info: FC<InfoProps>,
  EditInfo: FC<EditInfoProps>
  EditRegion: FC<EditRegionProps>
}
const PatientBasic: IPatientBasicComponent = {
  Info,
  EditInfo,
  EditRegion
};

export default PatientBasic;
