import React, { useState } from "react";
import DragModal from './index';
import '../../../node_modules/antd/dist/antd.css'
import '../../styles/_global.scss';

export default {
  title: "@Components/Modal",
  component: DragModal,
  parameters: {}
};

export const Modal = () => {
  const [show, setShow] = useState(false);
  const handleToggleShow = () => {
    setShow(!show);
  }
  return (
    <div>
      <div onClick={handleToggleShow}>点击显示弹框</div>
      <DragModal title="modal组件" children={<div>demo</div>} onCancel={handleToggleShow} visible={show} />
    </div>
  )
};


