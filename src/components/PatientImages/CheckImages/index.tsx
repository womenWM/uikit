import React, { FC, useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { RightOutlined } from '@ant-design/icons';
import Title from '../../PatientTitle';
import DragModal from '../../DragModal';

export interface IImageItem {
  category: number; // 0化验单  1检查单
  count: number;
  lastReportAt?: number;
  name: string;
  typeNew: string;
}
export interface IImageListProps {
  /**化验单列表（这里不在组件内获取图片列表是因为：数据存在redux里，所以这里通过传入方式获取）*/
  anaImg: IImageItem[];
  /**检查单列表*/
  insImg: IImageItem[];
  /**其它图片列表*/
  otherImg: IImageItem[];
  /**🔴  组件：查看当前某一项指标的图片列表*/
  imageListCom: (prop: any) => React.ReactElement;
}
const CheckImages: FC<IImageListProps> = (props) => {
  const { anaImg, insImg, otherImg, imageListCom } = props;
  const [showModal, setshowModal] = useState(false);
  const [activeItem, setActiveItem] = useState<IImageItem>();
  const [hideCont, setHideCont] = useState(false);

  const handleShowImages = (item: IImageItem) => {
    if (item.count) {
      setshowModal(true);
      setActiveItem(item);
    }
  };
  const getDate = (item:IImageItem) => {
    const { count, lastReportAt } = item;
    if (count === 0) {
      return '--';
    }
    return lastReportAt ? `(${dayjs(lastReportAt, 'x').format('YYYY.MM.DD')})` : '时间不详';
  };
  const typeList = [
    {
      title: '化验单',
      data: anaImg,
    },
    {
      title: '检查单',
      data: insImg,
    },
  ];
  const renderItem = useMemo(() => (data: IImageItem[], hideDate?: boolean) => (
    data.map((item:IImageItem) => (
      // red green
      <div
        // className={styles[color[item.status]]}
        onClick={() => handleShowImages(item)}
        key={item.name}
        className={`${(item.name === '待审核图片' && item.count > 0) ? 'red' : ''}`}
      >
        <span className="name">{item.name}</span>
        {
          !hideDate && (
            <span className="date">
              {getDate(item)}
            </span>
          )
        }
        <span className="count">
          {`${item.count}张`}
          <RightOutlined />
        </span>
      </div>
    ))), []);
  return (
    <div className="ui-checkimages ui-wrap-two">
      {
        typeList.map((t) => (
          <div className="check-img" key={t.title}>
            <Title title={t.title} />
            <div className="list">
              { t.data.length > 0 ? renderItem(t.data) : (
                <div className="item">
                  <svg className="icon" viewBox="0 0 1024 1024" version="1.1" p-id="1292">
                    <path d="M1007.104 830.2592L747.27424 570.9824a372.06016 372.06016 0 0 1 179.17952-45.64992c4.66944 0 9.216 0.6144 13.824 0.8192V194.2528a55.23456 55.23456 0 0 0-55.296-55.15264H314.30656L231.34208 56.32H912.5888a110.4896 110.4896 0 0 1 110.61248 110.3872v606.90432a107.9296 107.9296 0 0 1-16.09728 56.6272zM760.48384 249.4464a69.05856 69.05856 0 0 1 69.14048 68.99712 69.05856 69.05856 0 0 1-69.14048 68.95616 69.05856 69.05856 0 0 1-69.12-68.95616 69.03808 69.03808 0 0 1 69.12-69.0176zM971.1616 969.9328a41.5744 41.5744 0 0 1-58.6752 0L52.1216 111.616a41.32864 41.32864 0 0 1 0-58.55232 41.61536 41.61536 0 0 1 58.6752 0l860.3648 858.33728c16.1792 16.1792 16.1792 42.35264 0 58.53184zM82.96448 277.01248v551.8336-303.5136c63.2832-33.75104 135.3728-53.08416 211.7632-54.62016L791.9616 966.7584H110.592A110.51008 110.51008 0 0 1 0 856.3712V249.4464c0-20.7872 6.10304-40.05888 16.15872-56.64768l69.2224 69.03808a54.25152 54.25152 0 0 0-2.41664 15.19616z" fill="#D6D6D6" p-id="1293"></path>
                    </svg>
                  <span className="no-data-text">{`暂无${t.title}`}</span>
                </div>
              )}
            </div>
            {
              t.title === '检查单' && (
                <div className="mt-30">
                  <Title title="其他图片" />
                  <div className="list">
                    {renderItem(otherImg, true)}
                  </div>
                </div>
              )
            }
          </div>
        ))
      }
      <DragModal
        wrapClassName={`ant-modal-wrap-center ${hideCont ? 'mode_hide' : 'mode_block'}`}
        mask={!hideCont}
        width="1200px"
        visible={showModal}
        title={activeItem?.name || '单据'}
        onCancel={() => setshowModal(false)}
        footer={null}
      >
        {imageListCom({
          typeNew: activeItem?.typeNew as string,
          handleHideCont: () => setHideCont(!hideCont)
        })}
      </DragModal>
    </div>
  );
};

export default CheckImages;
