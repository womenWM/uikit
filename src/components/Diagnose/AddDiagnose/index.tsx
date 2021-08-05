import React, { FC, useState, useEffect } from 'react';
import DragModal from '../../DragModal';
import Calendar from '../../Calendar';
import { Form, Button, Input, message } from 'antd';
import { debounce } from 'lodash';
import dayjs from 'dayjs';

// 6.22备注 只弄了搜索诊断和搜索医院。未经实际使用测试。此文件AddDiagnose还没有改。、
// 。。。end-去弄指标库
export interface AddDiagnoseProps {
  /**类型 add 添加，edit 编辑 */
  type: string;
  /**初始化数据, 编辑时需要此参数 */
  initData?: IdiagnosisItem | null;
  /**添加诊断api | 编辑保存诊断api */
  request: (params: any) => Promise<any>;
  /**添加/编辑 成功后的回调 */
  onSuccess: () => void;
  /**患者patientSid */
  patientSid: string;
  /**患者patientWcid */
  patientWcid: string;
  /**roleId */
  roleId: string;
  /**🔴  组件：1.由于需要从此组件传递form实例，所以这里以函数形式传入，返回搜索医院组件2.当是编辑的时候需要回显，此时回显数据需要传递 */
  searchHospital: (form: any, initHospital?: object) => React.ReactElement;
  /**🔴  组件：由于需要从此组件传递form实例，所以这里以函数形式传入，返回搜索诊断组件 */
  searchDiagnose: (form: any, initData?: string) => React.ReactElement;
}
export interface IdiagnosisItem {
  name: string;
  diseaseId: string;
  id: string;
  attachedInfo: {
    diagnosisAt: number;
    hospitalName: string;
    hospitalId: string;
  }
}
interface IformValues {
  diagnose: {
    diseaseId: string;
    name: string;
  },
  diagnosisAt: number;
  hospital: {
    hospitalId: string;
    hospitalName: string;
  },
}
const AddDiagnose: FC<AddDiagnoseProps> = (props) => {
  const { children, type, initData, onSuccess, request, patientSid,
    patientWcid, roleId, searchHospital, searchDiagnose } = props;
  const [showModal, setshowModal] = useState(false);
  const [initFormVal, setInitFormVal] = useState<IformValues>();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const actionType = type === 'add' ? '添加' : '编辑';
  const handleShowModal = () => {
    if (type === 'edit') {
      // 把接口数据转为form表单数据格式
      const { diseaseId, name, attachedInfo } = initData as IdiagnosisItem;
      const { diagnosisAt, hospitalId, hospitalName } = attachedInfo;
      setInitFormVal({
        diagnose: {
          diseaseId,
          name,
        },
        diagnosisAt,
        hospital: {
          hospitalId,
          hospitalName,
        },
      });
    }
    setshowModal(true);
  };
  const handleSubmit = (values: IformValues) => {
    const { diagnose, hospital, diagnosisAt } = values;
    const params: {[key: string]: any} = {
      attachedInfo: {
        diagnosisAt: new Date(diagnosisAt).getTime(),
        ...hospital,
      },
      ...diagnose,
      wcId: patientWcid,
      sid: patientSid,
      roleType: roleId,
    };
    if (type === 'edit') {
      params.id = (initData as IdiagnosisItem).id;
    }
    request(params).then(() => {
      message.success(`${actionType}成功`);
      setshowModal(false);
      onSuccess();
    });
  };
  const handleSetFieldsVal = (key: string, val: any) => {
    if (key === 'diagnosisAt') {
      const dateArr = val.split('/');
      if (dateArr[0]) {
        setFieldsValue({ [key]: val, });
      }
    } else {
      setFieldsValue({ [key]: val, });
    }
  };
   // 回显时间
   let year: string | number = '';
   let month: string | number = '';
   let day: string | number = '';
   if (initFormVal?.diagnosisAt) {
    year = dayjs(initFormVal.diagnosisAt).format('YYYY');
    month = dayjs(initFormVal.diagnosisAt).format('MM');
    day = dayjs(initFormVal.diagnosisAt).format('DD');
   }
   useEffect(() => {
    if (!showModal) {
      form.resetFields();
    }
   }, [form, showModal]);
  return (
    <div>
      <span onClick={handleShowModal}>{children}</span>
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="580px"
            visible={showModal}
            title={`${actionType}诊断`}
            onCancel={() => setshowModal(false)}
            footer={null}
          >
            <div className="ui-diagnose__modifywrap ui-diagnose__add-diagnose">
              <Form
                name="diagnoseForm"
                initialValues={initFormVal}
                onFinish={debounce(handleSubmit, 300)}
                form={form}
                id="height42"
              >
                {searchDiagnose(form, initFormVal && initFormVal.diagnose.name)}
                <div className="flex">
                  <Form.Item
                    label="诊断日期"
                    name="diagnosisAt"
                    // rules={[{ required: true, message: '请输入诊断日期!' }]}
                  >
                    <Input type="hidden" />
                  </Form.Item>
                  <Calendar
                    needInit={false}
                    year={year}
                    month={month}
                    day={day}
                    onChange={(dateString) => handleSetFieldsVal('diagnosisAt', dateString)}
                  />
                </div>
                {searchHospital(form, initFormVal && initFormVal.hospital)}
                <Form.Item>
                  <div className="common__btn">
                    <Button
                      onClick={() => setshowModal(false)}
                    >
                      取消
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                    >
                      {type === 'add' ? '添加' : '保存'}
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </DragModal>
        )
      }
    </div>
  );
};

export default AddDiagnose;
