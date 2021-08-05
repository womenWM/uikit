import React, { useState, useRef, ReactElement } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import Draggable from 'react-draggable';

interface IProps {
  title: string | React.ReactElement;
  // eslint-disable-next-line react/require-default-props
  children: React.ReactElement;
  onCancel: () => void;
}

function DragModal(props: IProps & ModalProps) {
  const { title, children } = props;
  const initBounds = { left: 0, top: 0, bottom: 0, right: 0 };
  const [bounds, setbounds] = useState(initBounds);
  const [disabled, setDisabled] = useState(true);
  const draggleRef: any = useRef();

  const onStart = (event: any, uiData: any) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    // @ts-ignore
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setbounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };
  return (
    <Modal
      style={{ top: 0 }}
      maskClosable
      {...props}
      title={
        <div
          style={{ width: '100%', cursor: 'move', }}
          onMouseOver={() => { if (disabled) setDisabled(false) }}
          onMouseOut={() => setDisabled(true)}
        >
          {title}
        </div>
      }
      modalRender={modal => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
      destroyOnClose
    >
      {children}
    </Modal>
  );
}

export default DragModal;
