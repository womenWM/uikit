import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';

export interface IdiagnosisItem {
  name: string;
  diseaseId: string;
  id: string;
  attachedInfo: IAttachedInfo
}
export interface IAttachedInfo {
  diagnosisAt: number;
  hospitalName: string;
  hospitalId: string;
}
export interface DiagnoseListProps {
  /**患者的wcId */
  patientWcid: string;
  /**患者sid */
  sid: string;
  /**刷新列表：只要此参数有改变就刷新诊断列表 */
  reloadList: boolean;
  /**地区请求地址*/
  request: (params: any) => Promise<any>;
  /**删除成功的回调 */
  onSuccess: () => void;
  /**🔴  组件：医院信息 由于需要把当前医院信息传入，所以这里以函数形式*/
  hospitalCom: (data: IAttachedInfo) => React.ReactElement;
  /**🔴  组件： 删除按钮 需要把当前id传入*/
  btnDelCom: (data: string) => React.ReactElement;
  /**🔴  组件：编辑按钮 需要把初始信息传入*/
  editDiagnoseCom: (data: IdiagnosisItem) => React.ReactElement;
}
export interface IdiagnosisItem {
  name: string;
  diseaseId: string;
  id: string;
  attachedInfo: {
    diagnosisAt: number;
    hospitalName: string;
    hospitalId: string;
  }
}
const DiagnoseList: FC<DiagnoseListProps> = (props) => {
  const { hospitalCom, btnDelCom, editDiagnoseCom, sid, request, reloadList } = props;
  const [diagnosisList, setDiagnosisList] = useState<IdiagnosisItem[]>([]);

  useEffect(() => {
    if (diagnosisList.length === 0) {
      request({ sid }).then((res) => {
        setDiagnosisList(res.diagnosisList);
      });
    }
  }, [diagnosisList.length, request, sid]);
  useEffect(() => {
    request({ sid }).then((res) => {
      setDiagnosisList(res.diagnosisList);
    });
  }, [reloadList, request, sid])

  const fourHigh = ['高血压病', '糖尿病', '高脂血症', '高尿酸血症'];
  return (
    <>
      {
        diagnosisList.length === 0 && <span style={{ marginLeft: 10 }}>暂无诊断信息</span>
      }
      <ul className="ui-diagnose__diagnose-list">
        {
          diagnosisList.map((item: IdiagnosisItem, index) => (
            <li className="item" key={item.id}>
              <span className="item-left">
                {index + 1}
                .
              </span>
              <div className="item-right">
                <div>
                  <span className={`name ${fourHigh.includes(item.name) ? 'sick' : ''}`}>
                    {item.name}
                  </span>
                </div>
                <div className="info">
                  <span>{item.attachedInfo.diagnosisAt ? dayjs(item.attachedInfo.diagnosisAt).format('YYYY.MM.DD') : '--'}</span>
                  {hospitalCom(item.attachedInfo)}
                </div>
                <div className='btn-wrap'>
                  {editDiagnoseCom(item)}
                  {btnDelCom(item.id)}
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default DiagnoseList;
