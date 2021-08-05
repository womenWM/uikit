import React, { FC, useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { sexList } from '../../../utils/tools';

export interface InfoProps {
  /**获取基本信息api请求地址 */
  request: (params: any) => Promise<any>;
  /**api接口请求参数 */
  apiParams: {[name: string]: any};
  /**是否是养老患者 */
  isYlPatient: number;
  /**把患者信息返回出去，方便编辑时回显使用 */
  callbackData: (data: any) => void;
}

const Info: FC<InfoProps> = (props) => {
  const { request, apiParams, isYlPatient, callbackData } = props;
  const [patientInfo, setPatientInfo] = useState<ISubject>({});
  const fetchPatientInfo = useCallback(async() => {
      const res = await request(apiParams);
      console.log(323, res)
      if (res.wcl[0]?.roles?.[0]?.subject) {
        setPatientInfo(res.wcl[0].roles[0].subject);
        callbackData(res);
        // @ts-ignore
        if (window.$storage) {
          // @ts-ignore
          window?.$storage.setItem('patientRoleId', res.wcl[0].roles[0].id!);
        }
      }
  }, [apiParams, callbackData, request])
  useEffect(() => {
    fetchPatientInfo();
  }, [apiParams, fetchPatientInfo]);
  const {
    name, tel, age, height, weight, waistline, birthday, bmi,
    ethnicity, address, detailAddress, buildName, floorName, bedName,
    enterTime, sex,
  } = patientInfo; // 年龄   BMI
  return (
    <div className="u-patient-info__content">
        <div className="u-patient-info__item">
          <p>姓名: </p>
          <span>{name || '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>性别: </p>
          <span>{sexList[sex!] || '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>联系方式: </p>
          <span>{tel || '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>年龄: </p>
          <span>{age || '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>身高: </p>
          <span>{height ? `${height}cm` : '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>体重: </p>
          <span>{weight ? `${weight}kg` : '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>腰围: </p>
          <span>{waistline ? `${waistline}cm` : '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>生日: </p>
          <span>{(birthday && dayjs(birthday).format('YYYY-MM-DD')) || '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>BMI: </p>
          <span>{bmi || '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>民族: </p>
          <span>{ethnicity || '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>现住址: </p>
          <span>{address || '--'}</span>
        </div>
        <div className="u-patient-info__item">
          <p>详细地址: </p>
          <span>{detailAddress || '--'}</span>
        </div>
        {
          isYlPatient === 1 && (
            <>
              <div className="u-patient-info__item">
                <p>楼号: </p>
                <span>{buildName || '--'}</span>
              </div>
              <div className="u-patient-info__item">
                <p>楼层: </p>
                <span>{floorName || '--'}</span>
              </div>
              <div className="u-patient-info__item">
                <p>床位: </p>
                <span>{bedName || '--'}</span>
              </div>
              <div className="u-patient-info__item">
                <p>入住日期: </p>
                <span>{(enterTime && dayjs(enterTime).format('YYYY-MM-DD')) || '--'}</span>
              </div>
            </>
          )
      }
      </div>
  );
};

export default Info;
