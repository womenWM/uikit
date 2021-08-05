import React, { FC, useState } from 'react';
import { Form, Input, Select, Spin, message } from 'antd';
import { debounce } from 'lodash';

export interface SearchNameProps {
  /**初始值 */
  initData?: string;
  /**api请求地址 */
  request: (params: any) => Promise<any>;
  /**api请求，返回数据的字段 */
  apiResProp: string;
  /**提示文字 */
  typelabel: string;
  /**form item key */
  typeName: string;
  /**form实例 */
  form: any;
};
interface IDataItem {
  id: string;
  name: string;
}

const Option = Select.Option;
const SearchName: FC<SearchNameProps> = (props) => {
  const { initData, request, apiResProp, form, typelabel, typeName  } = props;
  const [dataList, setdataList] = useState<IDataItem[]>([])
  const [fetching, setfetching] = useState(false)
  const [keyWord, setKeyWord] = useState<string>('');
  const [pageAt, setPageAt] = useState(1);
  const { setFieldsValue } = form;
  const fetchDataList = (val: string, pageAtNum?: number) => {
    setfetching(true);
    if (val.trim()) {
      const params = { name: val, pageAt: pageAtNum, pageSize: 50 };
      request(params).then((res) => {
        if (res[apiResProp].length === 0 && pageAtNum === 1) {
          setfetching(false);
          message.warn('没有该诊断信息');
        }
        if (pageAtNum === 1) {
          setdataList([...res[apiResProp]]);
        } else {
          setdataList([...dataList, ...res[apiResProp]]);
        }
      });
    }
  }
  const handleSearch = (val: string) => {
    if (val.trim()) {
      setdataList([]);
      setKeyWord(val);
      setPageAt(1);
      fetchDataList(val, 1);
    }
  }
  const handleChange = (values: string, option: any) => {
    console.log(values);
    let trea = {};
    if (typelabel === 'diagnose') {
      trea = {
        diseaseId: option.value,
        name: option.title,
      };
    } else if(typelabel === 'treatment'){
      trea = {
        treatmentId: option.value,
        treatmentName: option.title,
      };
    }

    setFieldsValue({
      [typelabel]: trea,
    });
  }
  const handleOptionScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      // 在这里调用接口
      const nextPageAt = pageAt + 1;
      setPageAt(nextPageAt);
      fetchDataList(keyWord, nextPageAt);
    }
  };
  return (
    <div className="flex">
      <Form.Item
        label={`${typelabel}`}
        name={typeName}
        rules={[{ required: true, message: '请输入项目名称!' }]}
      >
        <Input type="hidden" />
      </Form.Item>
      <Select
        showSearch
        placeholder={`请输入${typelabel}`}
        showArrow={false}
        filterOption={false}
        onSearch={debounce((value: string) => {
          handleSearch(value);
        }, 500)}
        onChange={handleChange}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        style={{ width: '376px' }}
        defaultValue={initData}
        onPopupScroll={handleOptionScroll}
        virtual={false}
      >
        {dataList.map((dis) => (
          <Option
            key={dis.id}
            value={dis.id}
            title={dis.name}
          >
            {dis.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SearchName;
SearchName.defaultProps = {
  typelabel: '关键字',
};
