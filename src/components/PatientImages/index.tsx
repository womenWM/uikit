import { FC } from 'react';
import CheckImages, { IImageListProps } from './CheckImages';

export type IPatientDiagnoseComponent = {
  CheckImages: FC<IImageListProps>,
}
const PatientImages: IPatientDiagnoseComponent = {
  CheckImages,
};

export default PatientImages;
