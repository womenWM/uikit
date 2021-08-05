import React, { FC, useState } from 'react';
import { Popover } from 'antd';

export interface HospitalPopoverProps {
  /**医院信息的对象 */
  attachedInfo: {
    hospitalName?: string;
    hospitalId?: string;
  };
  /**获取医院详情接口地址*/
  request: (params: any) => Promise<any>;
}
const HospitalPopover: FC<HospitalPopoverProps> = (props) => {
  const { request, attachedInfo } = props;
  const { hospitalId, hospitalName } = attachedInfo;
  const [hospital, setHospital] = useState({ title: '', content: '' })
  const fetchHospitalDetail = () => {
    const params = {
      id: hospitalId,
      name: hospitalName,
    };
    request(params).then((res) => {
      console.log(res);
      const {
        province, district, county, address, name, city,
      } = res.organizationInfos[0] || {};
      setHospital({
        title: name || hospitalName,
        content: province ? `${province} ${city || ''} ${district || ''} ${county || ''} ${address || ''}` : '',
      });
    });
  };
  const resetHospital = () => {
    setHospital({ title: '', content: '' });
  };
  return (
    <>
      {
        hospitalName && (
          <Popover
            title={hospital.title}
            content={hospital.content} // 需要调接口获取
            placement="bottomLeft"
          >
            <span
              onMouseEnter={
                () => fetchHospitalDetail()
              }
              onMouseLeave={resetHospital}
            >
              {hospitalName}
            </span>
          </Popover>
        )
      }
    </>
  );
};

export default HospitalPopover;
