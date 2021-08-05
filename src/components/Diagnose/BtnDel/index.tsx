import React, { FC } from 'react';
import { Popconfirm, message } from 'antd';

export interface BtnDelProps {
  /**要删除条目的id */
  id: string;
  /**患者sid */
  sid: string;
  /**地区请求地址*/
  request: (params: any) => Promise<any>;
  /**删除成功的回调 */
  onSuccess: () => void;
}
const BtnDel: FC<BtnDelProps> = (props) => {
  const { request, id, onSuccess, sid } = props;

  const handleDelete = () => {
    request({ id, sid }).then(() => {
      message.success('删除成功');
      onSuccess();
    });
  }
  return (
    <Popconfirm
      placement="topLeft"
      title="是否删除该诊断"
      onConfirm={handleDelete}
      okText="是"
      cancelText="否"
    >
      <span className="ui-diagnose__delbtn">
        删除
      </span>
    </Popconfirm>
  );
};

export default BtnDel;
