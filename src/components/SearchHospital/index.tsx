import React, { useState, FC } from 'react';
import { Select, Spin, Form, Input} from 'antd';
import { debounce } from 'lodash';
import DragModal from '../DragModal';
import AddHospital from './AddHospital';

export interface SearchHospitalProps {
  /**form实例 */
  form: any;
  /**css样式 */
  style?: object;
  /**输入框提示语 */
  placeholder?: string;
  /**Form.Item的name */
  formItemName?: string;
  /**初始化医院数据 */
  initFormVal?: {
    hospitalName: string;
    hospitalId: string;
  }
  /**获取医院接口api */
  requestFetchHospital:  (params: any) => Promise<any>;
  /**添加医院接口api */
  requestAddHospital:  (params: any) => Promise<any>;
  /**获取级联地区接口api */
  requestFetchAddress:  (params: any) => Promise<any>;
}
export interface Ihospital {
  id: string;
  name: string;
}

interface IhospitalSubmit {
  hospitalId: string;
  hospitalName: string;
}

const { Option } = Select;
const SearchHospital: FC<SearchHospitalProps> = (props) => {
  const {
    style, form, formItemName, initFormVal, placeholder, requestAddHospital,
    requestFetchAddress, requestFetchHospital
  } = props;
  console.log('searchhosipital----props', props)
  const initName = initFormVal ? initFormVal.hospitalName : '';
  const [hospitals, setHospitals] = useState <Ihospital[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [hospitalName, setHospitalsName] = useState(initName);
  const [pageAt, setPageAt] = useState(1);
  const [keyWord, setKeyWord] = useState<string>('');
  const { setFieldsValue } = form;
  const fetchHospitals = (value: string, pageAtNum: number) => {
    if (value) {
      setFetching(true);
      const params = {
        name: value,
        pageAt: pageAtNum,
        pageSize: 50,
      };
      requestFetchHospital(params).then((res) => {
        setFetching(false);
        if (res.organizationInfos.length === 0 && pageAtNum === 1) {
          setSearchEmpty(true);
        }
        if (pageAtNum === 1) {
          setHospitals(res.organizationInfos);
        } else {
          setHospitals([...hospitals, ...res.organizationInfos]);
        }
      });
    }
  };
  const handleSelect = (value: string, option: any) => {
    if (value === 'unresult') {
      // 显示弹框
      setShowModal(true);
    } else {
      setHospitalsName(option.children);
      setFieldsValue({
        [formItemName!]: {
          hospitalName: option.children,
          hospitalId: value,
        }
      });
    }
  };
  const handleSave = (name: string, id: string) => {
    setShowModal(false);
    setHospitalsName(name);
    setFieldsValue({
      [formItemName!]: {
        hospitalName: name,
        hospitalId: id,
      }
    });
  };
  const handleOptionScroll = (e: any) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      // 在这里调用接口
      const nextPageAt = pageAt + 1;
      setPageAt(nextPageAt);
      fetchHospitals(keyWord, nextPageAt);
    }
  };
  const handleSearch = (value: string) => {
    if (value) {
      setHospitals([]); // 处理select的option渲染叠加之前数据问题
      setKeyWord(value);
      fetchHospitals(value, 1);
      setPageAt(1);
    }
  };
  return (
    <div className="flex">
      <Form.Item
        label="诊断医院"
        name={formItemName}
      >
        <Input type="hidden" />
      </Form.Item>
      <Select
        showSearch
        placeholder={placeholder}
        showArrow={false}
        filterOption={false}
        onSearch={debounce((value: any) => handleSearch(value), 500)}
        onSelect={handleSelect}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        style={style}
        value={hospitalName}
        onPopupScroll={handleOptionScroll}
        virtual={false}
      >
        {hospitals.map((medicine) => (
          <Option key={medicine.id} value={medicine.id}>
            {medicine.name}
          </Option>
        ))}
        <Option
          value="unresult"
          style={{ display: (hospitals.length === 0 && searchEmpty) ? 'block' : 'none' }}
        >
          未找到想要的医院
        </Option>
      </Select>
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="410px"
            visible={showModal}
            title="添加机构"
            onCancel={() => setShowModal(false)}
            footer={null}
          >
            <AddHospital
              onCancel={() => setShowModal(false)}
              onSuccess={handleSave}
              requestAddHospital={requestAddHospital}
              requestFetchAddress={requestFetchAddress}
            />
          </DragModal>
        )
      }
    </div>
  );
}

SearchHospital.defaultProps = {
  style: {
    width: '100%',
  },
  placeholder: '请输入医院',
  formItemName: 'hospital'
};

export default SearchHospital;
