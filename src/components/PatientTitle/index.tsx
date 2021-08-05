import React from 'react';


interface IProps {
  title: string;
}
const PatientTitle = ({ title }: IProps) => {
  return (
    <div className="ui_patient_title">
      <h3>{title}</h3>
    </div>
  );
};

export default PatientTitle;
