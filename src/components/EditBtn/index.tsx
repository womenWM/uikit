import React, { FC } from 'react';
import { EditFilled } from '@ant-design/icons';

interface IProps {
  icon?: React.ReactElement; // 默认是编辑按钮
  text: string;
  hideIcon?: boolean; // 默认显示icon，如果隐藏，需传此参数
}
const patientEditBtn: FC<IProps> = (props) => {
  const { icon, text, hideIcon } = props;
  return (
    <div className="ui_rightAddbtn">
      {
        !hideIcon && (
          icon ? icon : <EditFilled />
        )
      }
      {text}
    </div>
  );
};

export default patientEditBtn;
