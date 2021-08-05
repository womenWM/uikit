import React, { useState, useEffect, useCallback } from 'react';
import { Select, Space } from 'antd';

interface Iregion {
  regionName: string;
  id: string;
}
type INumUnd = number | undefined;
type IStrUnd = string | undefined;
export interface IRegion {
  provinceName?: IStrUnd;
  cityName?: IStrUnd;
  townName?: IStrUnd;
  address?: IStrUnd;
  provinceCode?: INumUnd;
  townCode?: INumUnd;
  cityCode?: INumUnd;
}
interface Iprops {
  onChange: (region: IRegion) => void;
  initData: IRegion;
  request: (params: any) => Promise<any>; // api请求地址
}
const { Option } = Select;
function Region({ onChange, initData, request }: Iprops) {
  const { provinceCode, townCode, cityCode } = initData;
  console.log('initDatainitData', provinceCode);
  const [province, setProvince] = useState<INumUnd>(provinceCode);
  const [city, setCity] = useState<INumUnd>(cityCode);
  const [town, setTown] = useState<INumUnd>(townCode);
  const [provinces, setProvinces] = useState<Iregion[]>([]);
  const [citys, setCitys] = useState<Iregion[]>([]);
  const [towns, setTowns] = useState<Iregion[]>([]);
  const [address, setAddress] = useState(initData?.address || ''); // 现住址：省 市  县

  const fetchAddress = useCallback(async (id: number, type: string) => {
    console.log('request', request)
    const res = await request({ id });
    switch (type) {
      case 'province':
        setProvinces(res.regions);
        break;
      case 'city':
        setCitys(res.regions);
        break;
      case 'town':
        setTowns(res.regions);
        break;
      default:
        break;
    }
  }, [request]);
  useEffect(() => {
    fetchAddress(0, 'province');
    if (provinceCode) {
      fetchAddress(provinceCode, 'city');
    }
    if (cityCode) {
      fetchAddress(cityCode, 'town');
    }
  }, [provinceCode, cityCode, fetchAddress]);
  const changeRegion = (name: string, value: number, { title }: any) => {
    const newDomicile = address.split(' ');
    switch (name) {
      case 'province':
        onChange({
          provinceCode: value,
          provinceName: title,
          cityCode: 0,
          cityName: '',
          townCode: 0,
          townName: '',
          address: title,
        });
        setProvince(value);
        setAddress(title);
        setCity(0);
        setTown(0);
        fetchAddress(value, 'city');
        break;
      case 'city':
        onChange({
          cityCode: value,
          cityName: title,
          townCode: 0,
          townName: '',
          address: `${newDomicile[0]} ${title}`,
        });
        setCity(value);
        setTown(0);
        setAddress(`${newDomicile[0]} ${title}`);
        if (value) {
          fetchAddress(value, 'town');
        }
        break;
      case 'town':
        onChange({
          townCode: value,
          townName: title,
          address: `${newDomicile[0]} ${newDomicile[1]} ${title}`,
        });
        setAddress(`${newDomicile[0]} ${newDomicile[1]} ${title}`);
        setTown(value);
        break;
      default:
        break;
    }
  };
  const selectStyle = { minWidth: 110, fontSize: 14 };
  return (
    <div className="right" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Space className="w-full justify-between">
        <Select
          placeholder="省"
          style={selectStyle}
          onSelect={(value, option) => changeRegion('province', value, option)}
          value={province}
        >
          {provinces.map((val) => (
            <Option
              key={val.id}
              value={val.id}
              title={val.regionName}
            >
              {val.regionName}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="市"
          style={selectStyle}
          disabled={!province}
          onSelect={(value, option) => changeRegion('city', value, option)}
          value={city}
        >
          <Option
            key="emptyCity"
            value={0}
            title=""
          >
            暂不选择
          </Option>
          {citys.map((val) => (
            <Option
              key={val.id}
              value={val.id}
              title={val.regionName}
            >
              {val.regionName}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="县"
          style={selectStyle}
          disabled={!city}
          onSelect={(value, option) => changeRegion('town', value, option)}
          value={town}
        >
          <Option
            key="emptyTown"
            value={0}
            title=""
          >
            暂不选择
          </Option>
          {towns.map((val) => (
            <Option
              key={val.id}
              value={val.id}
              title={val.regionName}
            >
              {val.regionName}
            </Option>
          ))}
        </Select>
      </Space>
    </div>
  );
}

export default Region;
