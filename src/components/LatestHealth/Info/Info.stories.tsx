import React from "react";
import LatestHealthInfo, { IMedicalList } from './index';
import "../../../styles/index.scss";
// 用药达标模块，只抽取了展示信息部分，点击 日期查看趋势图和点击达标值进行修改没有抽取共用组件（此功能目前只有医生端有）
export default {
  title: "@LatestHealth/Info",
  component: LatestHealthInfo,
  parameters: {}
};

const data: any[] = [{"name":"血压","measuredAt":1623474473820,"value":"110/80","color":"GREEN","unit":"mmHg","status":"NORMAL","abbreviation":"BP","unifiedReference":"130/80","customizedReferenceMax":140,"customizedReferenceMin":90,"spliceSymbol":"/"},{"name":"心率","measuredAt":1623474473820,"value":"60","color":"GREEN","unit":"次／分","status":"NORMAL","abbreviation":"HEART_RATE","unifiedReference":"60-75","customizedReferenceMax":100,"customizedReferenceMin":60,"spliceSymbol":"-"},{"name":"空腹血糖","measuredAt":1623474298439,"value":"4","color":"GREEN","unit":"mmol/L","status":"NORMAL","abbreviation":"GLU_BEFORE_BREAKFAST","unifiedReference":"3.9-6.1","customizedReferenceMax":6.1,"customizedReferenceMin":3.9,"spliceSymbol":"-"},{"name":"总胆固醇","measuredAt":1617897600000,"value":"66","color":"RED","unit":"mmol/L","status":"HIGH","abbreviation":"TC","unifiedReference":"3.3-5","customizedReferenceMax":5.7,"customizedReferenceMin":3.1,"spliceSymbol":"-"},{"name":"甘油三酯","measuredAt":1618848000000,"value":"67","color":"RED","unit":"mmol/L","status":"HIGH","abbreviation":"TG","unifiedReference":"0.4-1.7","customizedReferenceMax":1.7,"customizedReferenceMin":0.4,"spliceSymbol":"-"},{"name":"低密度脂蛋白","measuredAt":1618416000000,"value":"200","color":"RED","unit":"mmol/L","status":"HIGH","abbreviation":"LDL_C","unifiedReference":"1.8-3.2","customizedReferenceMax":3.4,"customizedReferenceMin":1,"spliceSymbol":"-"},{"name":"尿酸","measuredAt":1618416000000,"value":"1","color":"BLUE","unit":"umol/L","status":"LOW","abbreviation":"UA","unifiedReference":"89-360","customizedReferenceMax":360,"customizedReferenceMin":88,"spliceSymbol":"-"}]

export const Info = () => (
  <LatestHealthInfo
    medicalIndexList={data}
  />
);


