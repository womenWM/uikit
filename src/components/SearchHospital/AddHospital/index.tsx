import React, { useState, useEffect, useCallback } from 'react';
import {
  Button, Input, Select, message,
} from 'antd';

interface Iregion {
  regionName: string;
  id: string;
}
interface Iprops {
  /**取消添加医院 */
  onCancel: () => void;
  /**添加医院成功回调 */
  onSuccess: (name: string, id: string) => void;
  /**添加医院接口api */
  requestAddHospital: (params: any) => Promise<any>;
  /**获取级联地区接口api */
  requestFetchAddress: (params: any) => Promise<any>;
}
const { Option } = Select;
export default function AddHospital(props: Iprops) {
  const { onCancel, onSuccess, requestAddHospital, requestFetchAddress } = props;
  const [newHospital, setNewHospital] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [province, setProvince] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>('');
  const [county, setCounty] = useState<string | null>('');
  const [provinces, setProvinces] = useState<Iregion[]>([]);
  const [provincesName, setProvincesName] = useState<string>();
  const [cityName, setCityName] = useState<string>();
  const [countyName, setCountyName] = useState<string>();
  const [citys, setCitys] = useState<Iregion[]>([]);
  const [countys, setCountys] = useState<Iregion[]>([]);
  useEffect(() => {
    if (!!province && !!city && !!newHospital) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [province, city, newHospital]);
  const fetchAddress = useCallback((id: number, type: string) => {
    requestFetchAddress({ id }).then((res) => {
      switch (type) {
        case 'province':
          setProvinces(res.regions);
          break;
        case 'city':
          setCitys(res.regions);
          break;
        case 'county':
          setCountys(res.regions);
          break;
        default:
          break;
      }
    });
  }, [requestFetchAddress]);
  useEffect(() => {
    if (provinces.length === 0) {
      fetchAddress(0, 'province');
    }
  }, [fetchAddress, provinces.length]);

  const handleChangeOrg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHospital(e.target.value);
  };
  const changeRegion = (name: string, value: any, option: any) => {
    switch (name) {
      case 'province':
        setProvince(value);
        setCity('');
        setCounty('');
        setCountyName('');
        setCityName('');
        fetchAddress(value, 'city');
        setProvincesName(option.title);
        break;
      case 'city':
        setCity(value);
        setCounty('');
        setCountyName('');
        if (value) {
          fetchAddress(value, 'county');
          setCityName(option.title);
        }
        break;
      case 'county':
        setCounty(value);
        setCountyName(option.title);
        break;
      default:
        break;
    }
  };
  const handleSubmit = () => {
    const params = {
      name: newHospital,
      province: provincesName,
      city: cityName,
      county: countyName,
    };
    requestAddHospital(params).then((res) => {
      message.success('添加成功');
      onSuccess(newHospital, res.id);
    });
  };
  const selectStyle = { width: 100, fontSize: 14 };
  return (
    <div className="ui-add_hospital">
      <Input
        placeholder="请输入医院/医疗机构名"
        value={newHospital}
        onChange={handleChangeOrg}
      />
      <div className='ui-add_hospital__area'>
        <Select
          placeholder="省"
          style={selectStyle}
          onSelect={(value, option) => changeRegion('province', value, option)}
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
          value={city!}
          onSelect={(value, option) => changeRegion('city', value, option)}
        >
          <Option
            key="emptyCity"
            value=""
            title="暂不选择"
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
          value={county!}
          onSelect={(value, option) => changeRegion('county', value, option)}
        >
          <Option
            key="emptyTown"
            value=""
            title="暂不选择"
          >
            暂不选择
          </Option>
          {countys.map((val) => (
            <Option
              key={val.id}
              value={val.id}
              title={val.regionName}
            >
              {val.regionName}
            </Option>
          ))}
        </Select>
      </div>
      <div className="common__btn">
        <Button onClick={onCancel}>取消</Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={disabled}
          onClick={handleSubmit}
        >
          确定
          {!province && !city && !newHospital}
        </Button>
      </div>
    </div>
  );
}
