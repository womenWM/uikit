import React, { FC } from 'react';
// import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export interface IMedicalList {
  name: string;
  unit: string;
  customizedReferenceMax: number;
  customizedReferenceMin: number;
  originCustomizedReferenceMax: number;
  originCustomizedReferenceMin: number;
  action: string;
  abbreviation: string;
  spliceSymbol: string;
  unifiedReference: string;
  measuredAt: number;
  value: string;
  color: string;
}
export interface InfoProps {
  /**达标值是否可编辑 医生端点击达标值可编辑达标值 */
  editStandard?: React.ReactElement;
  /**指标日期点击查看趋势图 */
  medicalChat?: (item: IMedicalList) => React.ReactElement;
  /**显示数据 */
  medicalIndexList: IMedicalList[];
}
const Info: FC<InfoProps> = (props) => {
  const { medicalIndexList, editStandard, medicalChat } = props;
  return (
    <div className="ui-latest-health-info">
      <div className="ui-latest-health-info__item">
        <div className="ui-latest-health-info__name">&nbsp;</div>
        <div className="ui-latest-health-info__actual">实际值</div>
        <div className="ui-latest-health-info__standard">
          {
            editStandard ? editStandard : '达标值'
          }
        </div>
      </div>
      {
        medicalIndexList.map((item) => (
          <div className="ui-latest-health-info__item" key={item.name}>
            <div className="ui-latest-health-info__name">{item.name}</div>
            <div className="ui-latest-health-info__actual">
              <span className={item.value ? item.color : ''}>{item.value || '暂无信息'}</span>
              {
                item.measuredAt && (
                  medicalChat ? medicalChat(item) : `(${dayjs(item.measuredAt).format('MM.D')})`
                )
              }
            </div>
            <div className="ui-latest-health-info__standard">
              {item.name === '血压' ? item.customizedReferenceMax : item.customizedReferenceMin}
              {item.spliceSymbol}
              {item.name === '血压' ? item.customizedReferenceMin : item.customizedReferenceMax}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Info;
