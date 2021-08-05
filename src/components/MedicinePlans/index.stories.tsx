import React from "react";
import MedicinePlans from './index';

export default {
  title: "@MedicinePlans",
  component: MedicinePlans,
  parameters: {}
};

const currentMedicinePlans = [{"medicine":{"medicineType":2,"medicineId":"dev.keK1ZW","name":"阿方法个","dosageFormUnit":"片","imageUrl":[],"usage":"TAKE_ORALLY","strength":"周"},"plans":[{"planId":"dev.WdPrBZ","count":1000,"range":{"start":1632351600000,"end":1632353400000},"cycleDays":[0],"boxCellNos":[]},{"planId":"dev.Ww7a8J","count":1000,"range":{"start":1629327600000,"end":1629329400000},"cycleDays":[0],"boxCellNos":[]}]},{"medicine":{"medicineType":1,"medicineId":"dev.4v3n11","name":"1阿胶益寿口服液2阿胶益寿合剂","company":"华润三九（临清）药业有限公司","commodity":"1阿胶益寿口服液2阿胶益寿合剂","ingredient":"复方（炙黄芪、制何首乌、阿胶、熟地黄、人参、陈皮、木香、甘草）","dosage":20000,"dosageUnitFlag":3,"dosageFormUnit":"个","category":"中成药"},"plans":[{"planId":"dev.0pBNzO","count":1000,"range":{"start":1628222400000,"end":1628224200000},"cycleDays":[2],"boxCellNos":[]}]},{"medicine":{"medicineType":1,"medicineId":"dev.WVG5X4","name":"注射用放线菌素D","company":"上海上药新亚药业有限公司","commodity":"注射用放线菌素D","ingredient":"放线菌素D","dosage":200,"dosageUnitFlag":1,"dosageFormUnit":"个","category":"肿瘤药"},"plans":[{"planId":"dev.eKyNYG","count":750,"range":{"start":1628222400000,"end":1628224200000},"cycleDays":[1],"boxCellNos":[]},{"planId":"dev.0Xjlz9","count":1000,"range":{"start":1628161200000,"end":1628163000000},"cycleDays":[1],"boxCellNos":[]}]},{"medicine":{"medicineType":2,"medicineId":"dev.V0Xxq0","name":"1","dosageFormUnit":"片","imageUrl":[],"usage":"TAKE_ORALLY","strength":"4"},"medicineSource":2,"plans":[{"planId":"dev.WDBJY2","count":1000,"range":{"start":1628204400000,"end":1628206200000},"cycleDays":[1],"boxCellNos":[]}]}];

export const index = () => (
  <MedicinePlans currentMedicinePlans={currentMedicinePlans}/>
);
