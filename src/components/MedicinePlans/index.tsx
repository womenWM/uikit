import React, { useState } from 'react';
import { Popover } from 'antd';
import DragModal from '../DragModal'
import moment from 'moment';

interface IFormatPlansItem {
  medicine: {
    dosage: number;
    name: string;
    dosageUnitFlag: number;
    medicineId: string;
    commodity: string;
  };
  plans: IIndex;
}
interface IIndex {
  [k: number]: any;
}
interface IProps {
  /**当前服药计划 */
  currentMedicinePlans: IMedicinePlans[];
}
function PlansDetail(props: IProps) {
  const {currentMedicinePlans } = props;
  const unitFlagRe: IIndexObject = {
    1: 'mg',
    2: 'g',
    3: 'ml',
    4: 'iu',
    6: 'ug',
    7: 'wu',
    5: '-',
  };

  console.log('currentMedicinePlans', currentMedicinePlans);
  const [showModal, setShowModal] = useState(false);
  const [dateArray, setDateArray] = useState<string[]>([]);
  // 格式化服药记录数据
  const formatAllPlans = (value: IMedicinePlans[]) => {
    let newAllPlans: IFormatPlansItem[] = [];
    value.forEach((item: IMedicinePlans) => {
      const allPlansItem: any = {};
      allPlansItem.medicine = item.medicine;
      const newObj: IIndex = {};
      item.plans.forEach((v) => {
        if (newObj[v.count]) {
          newObj[v.count] = [
            ...newObj[v.count],
            {
              start: v.range.start,
              confirmAt: v.confirmAt,
              boxCellNos: v.boxCellNos,
            },
          ];
        } else {
          newObj[v.count] = [
            {
              start: v.range.start,
              confirmAt: v.confirmAt,
              boxCellNos: v.boxCellNos,
            },
          ];
        }
      });
      allPlansItem.plans = newObj;
      newAllPlans = [...newAllPlans, allPlansItem];
    });
    return newAllPlans;
  };

  const handleShowModal = (formateRateArray: string[]) => {
    setShowModal(true);
    setDateArray([...formateRateArray]);
  };
  // 仓内药展示在最上面
  const allPlans = formatAllPlans(currentMedicinePlans.sort(
    (a, b) => b.plans[0]?.boxCellNos[0] || 0 - a.plans[0]?.boxCellNos[0] || 0,
  ));
  const formatWeek = ['日', '一', '二', '三', '四', '五', '六'];
  // 浏览器可视口宽度
  const innerWidth = window.innerWidth
   || document.documentElement.clientWidth || document.body.clientWidth;
  const formatRate = (formatVal: string, rateArray: Date[]) => {
    return Array.from(new Set((rateArray.map((item: Date) => moment(item).format(formatVal))))).sort()
  }
  return (
    <div className="ui-mp-content">
      {
        allPlans.length > 0 ? (
          <ul className='list_head'>
            <li className='list_index'/>
            <li className="list_name">药名</li>
            <li className="list_value">剂量</li>
            <li className="list_time">时间</li>
          </ul>
        ) : '暂无患者用药信息'
      }
      {
        allPlans.length > 0 && (
          <ul className="list_outer">
            {allPlans.map((rItem: IFormatPlansItem, idx) => {
              // 服药计划
              const plansArray = currentMedicinePlans[idx].plans;
              // 仓内药
              const boxCellNos = plansArray[0]?.boxCellNos[0];
              // 是否显示“明日生效”: 时间合法，action合法
              const timeLegal = plansArray[0]?.range.start > new Date(+moment().endOf('day'));
              const actionLegal = plansArray[0]?.actions?.filter(
                (item) => item.actionType === 3).length > 0;
              const showEffect = actionLegal && timeLegal;
              // 是否是自定义药品
              const isCustomMedicine = currentMedicinePlans[idx].medicine.medicineType === 2;
              // 服药频率数组
              const rateArray = plansArray?.map(
                (item: { range: { start: Date }}) => item.range.start
              );
              // 频率类型 [7]:周几 [0]: xxxx.xx.xx
              const rateType = plansArray[0]?.cycleDays[0];
              // 根据类型格式化服药频率数组
              const formateRateArray = rateType === 7 ? formatRate('d', rateArray)
                : formatRate('YYYY.MM.DD', rateArray);
              // 是否显示“全部”按钮
              const showTotalBtn = innerWidth < 1394 || formateRateArray.length > 2;
              return (
                <li key={rItem.medicine.medicineId} className={boxCellNos ? "box_inner" : ''}>
                  <span className="list_index">
                    {boxCellNos ? `${boxCellNos}号仓` : '仓外'}
                  </span>
                  <div className="list_name">
                    <Popover
                      placement="bottomLeft"
                      title={null}
                      content={(
                        <div>
                          <p>
                            化学名：
                            {rItem.medicine.name}
                          </p>
                          <p>
                            商品名：
                            {rItem.medicine.commodity}
                          </p>
                          <p>
                            单位规格：
                            {rItem.medicine.dosage ? `${rItem.medicine.dosage / 1000}${rItem.medicine.dosageUnitFlag ? unitFlagRe[rItem.medicine.dosageUnitFlag] : '-'}` : '--'}
                          </p>
                        </div>
                      )}
                    >
                      {rItem.medicine.name}
                    </Popover>
                    {
                      isCustomMedicine && (
                        <p className="frequency">
                          {
                            rateType === 7 && (
                              <p className="date week">
                                每周
                                {
                                  formateRateArray.map((item, index) => (
                                    <span key={`${item}`}>
                                      {`${formatWeek[Number(item)]}${index !== formateRateArray.length - 1 ? '、' : ''}`}
                                    </span>
                                  ))
                                }
                              </p>
                            )
                          }
                          {
                            rateType === 0 && (
                              <>
                                <p className={`date ${showTotalBtn ? '' : 'week'}`}>
                                  {
                                    formateRateArray.map((item, index) => (
                                      <span key={`${item}`}>
                                        {`${item}${index !== formateRateArray.length - 1 ? '、' : ''}`}
                                      </span>
                                    ))
                                  }
                                </p>
                                {
                                  showTotalBtn && (
                                    <span
                                      className='total'
                                      onClick={() => handleShowModal(formateRateArray)}
                                    >
                                      全部
                                    </span>
                                  )
                                }
                              </>
                            )
                          }
                        </p>
                      )
                    }
                    {
                      showEffect && boxCellNos && <p className='effect_time'>明日生效</p>
                    }
                  </div>
                  <div className='list_plan'>
                    {Object.keys(rItem.plans).map((pItem) => {
                      const dosage = rItem.medicine?.dosage / 1000;
                      return (
                        <div key={pItem} className='plan_item'>
                          <p className="list_value">
                            {
                              // eslint-disable-next-line no-nested-ternary
                              Number(pItem) && dosage
                                ? rItem.medicine.dosageUnitFlag
                                  ? `${Math.round((Number(pItem) / 1000) * dosage * 100) / 100}${unitFlagRe[rItem.medicine.dosageUnitFlag]}`
                                  : `${Math.round((Number(pItem) / 1000) * dosage * 100) / 100}`
                                : '/'
                            }
                          </p>
                          <p className="list_time">
                            {Array.from(new Set(rItem.plans[Number(pItem)].map((p: { start: string }) => moment(p.start).format('H:mm')))).map(
                              (v: any) => (<span key={v} className="time">{v}</span>),
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        )
      }
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="500px"
            visible={showModal}
            title="全部日期"
            onCancel={() => setShowModal(false)}
            footer={null}
          >
            <div>
              {
                dateArray.map((item, index) => (
                  <span key={item} style={{fontSize: 16}}>
                    {`${moment(item).format('YYYY.MM.DD')}`}
                    {
                      index !== dateArray.length - 1 && '、'
                    }
                  </span>
                ))
              }
            </div>
          </DragModal>
        )
      }
    </div>
  );
}

export default PlansDetail;
