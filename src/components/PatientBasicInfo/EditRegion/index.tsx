import React, { FC } from 'react';
import Region from '../../Region';
import { Form, Input } from 'antd';

export interface EditRegionProps {
  /**api请求地址 */
  request: (params: any) => Promise<any>;
  /**地址的回显数据 */
  initFormVal: ISubject;
  /**form实例 */
  form: any;
}
const EditRegion: FC<EditRegionProps> = (props) => {
  const { request, initFormVal, form} = props;
  const { setFieldsValue } = form;

  const onChangeRegion = (region: any) => {
    setFieldsValue({
      ...region,
    });
  }
  return (
    <>
      <Form.Item
        label="现住址"
        name="provinceName"
      >
        <Input type="hidden" />
        <Form.Item noStyle>
        <Region
          request={request}
          onChange={onChangeRegion}
          initData={initFormVal}
        />
        </Form.Item>
      </Form.Item>
      <div style={{ display: 'none' }}>
        <Form.Item label="" name="cityName">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="" name="cityCode">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="" name="townName">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="" name="townCode">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="" name="provinceCode">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="" name="address">
          <Input type="hidden" />
        </Form.Item>
      </div>
    </>
  );
};

export default EditRegion;
