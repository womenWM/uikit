
import React, { FC, useState } from 'react';
import DragModal from '../../DragModal';
import Calendar from '../../Calendar';
import { debounce } from 'lodash';
import {
  Form, Input, Radio, InputNumber, Button, message,
} from 'antd';

interface CommonData {
  [index: string]: any;
}
export interface EditInfoProps {
  /**触发按钮 */
  children: React.ReactElement;
  /**初使化数据 */
  initFormVal: ISubject;
  /**保存成功回调 */
  onSuccess: () => void;
  /**保存患者信息接口地址 */
  request: (params: any) => Promise<any>;
   /**传进来的地区选择组件实例 */
  editRegion: React.ReactElement;
  /**form实例 */
  form: any;
}

const EditInfo: FC<EditInfoProps> = (props) => {
  const { children, onSuccess, request, initFormVal, editRegion, form } = props;
  console.log('request', request)
  const [showModal, setshowModal] = useState(false);
  const { setFieldsValue } = form;

  const handleShowModal = () => {
    setshowModal(!showModal);
  }
  const handleSubmit = (values: any) => {
    console.log(values);
    const params = {
      id: initFormVal?.id,
      ...values,
    };
    request(params).then(() => {
      message.success('保存成功');
      setshowModal(false);
      onSuccess();
    });
  };

  const handleSetFieldsVal = (key: string, val: any) => {
    console.log(val);
    if (setFieldsValue) {
      setFieldsValue({
        [key]: new Date(val).getTime(),
      });
    }

  };

  const baseSex: CommonData = {
    男: 1,
    女: 0,
    保密: 2,
  };

  return (
    <div>
      <span onClick={handleShowModal}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="655px"
        visible={showModal}
        title="基本资料"
        onCancel={() => setshowModal(false)}
        footer={null}
      >
        <div className="ui-patient-info-edit">
          <Form
            name="basicInfo"
            initialValues={initFormVal}
            onFinish={debounce(handleSubmit, 300)}
            form={form}
            id="height42"
          >
            <Form.Item
              label="姓名"
              name="name"
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              label="性别"
              name="sex"
            >
              <Radio.Group>
                {
                  Object.keys(baseSex).map((item: string) => (
                    <Radio value={baseSex[item]} key={item}>{item}</Radio>
                  ))
                }
              </Radio.Group>
            </Form.Item>
            <div className="measurements">
              <Form.Item
                label="身高"
                name="height"
              >
                <InputNumber
                  step={1}
                  precision={0}
                  min={1}
                />
              </Form.Item>
              <span>CM</span>
              <Form.Item
                label="体重"
                name="weight"
              >
                <InputNumber
                  step={1}
                  precision={0}
                  min={1}
                />
              </Form.Item>
              <span>KG</span>
              <Form.Item
                label="腰围"
                name="waistline"
              >
                <InputNumber
                  step={1}
                  precision={0}
                  min={1}
                />
              </Form.Item>
              <span>CM</span>
            </div>
            <Form.Item
              label="生日"
              name="birthday"
            >
              <Input type="hidden" />
              <Form.Item noStyle>
                <Calendar
                  needInit={false}
                  value={initFormVal.birthday}
                  onChange={(dateString: string) => handleSetFieldsVal('birthday', dateString)}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="联系方式"
              name="tel"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="民族"
              name="ethnicity"
            >
              <Input />
            </Form.Item>
            {editRegion}
            <Form.Item
              label="详细地址"
              name="detailAddress"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <div className="common__btn">
                <Button onClick={handleShowModal}>取消</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="finish"
                >
                  确定
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </div>
  );
};

export default EditInfo;
