
import React, { FC, useState, useEffect } from 'react';
import Viewer from '../../Viewer/Viewer';
// viewer里使用了字体图标，需要引入表态资源，目前打包失败。所以此组件doctor没有引用

export interface ImageListProps {
  /**图片类型*/
  typeNew: string;
  /**点击单个图片显示查看器时，隐藏图片列表内容*/
  handleHideCont: () => void;
  /**患者sid */
  sid: string;
  /**患者wcid */
  wcId: string;
  /**获取当前图片类型的图片列表*/
  request: (params: any) => Promise<any>;
  /**图片旋转保存api*/
  requestImageDegree: (params: any) => Promise<any>;
}
interface IImg {
  imageId: number;
  uploadTime: number;
  url: string;
  status: number; // 0是异常 1是正常
  degree: number;
}
const ImageListWrap: FC<ImageListProps> = (props) => {
  const { typeNew, sid, wcId, request, requestImageDegree, handleHideCont } = props;
  const [showViewer, setShowViewer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // 预览图片，当前选中第几张
  const [degree, setDegree] = useState(0);
  // const [showNoDate, setShowNoDate] = useState(true); // 时间不详过滤
  const [imageId, setImageId] = useState<number | null>();
  const [imgList, setImgList] = useState<IImg[]>([]);
  useEffect(() => {
    const params = {
      typeNew,
      sid,
      wcId,
    };
    request(params).then((res: {imageInfos: IImg[]}) => {
      setImgList(res.imageInfos);
    });
  }, [request, sid, typeNew, wcId]);
  const toggleShowViewer = (index: number, imgId: number, imgDegree: number) => {
    setShowViewer(!showViewer);
    setActiveIndex(index);
    setImageId(imgId);
    setDegree(imgDegree);
    handleHideCont();
    setTimeout(() => {
      const domKey = degree > 0 ? 'rotateRight' : 'rotateLeft';
      const degreeDom = document.querySelector(`.react-viewer-btn[data-key="${domKey}"]`);
      const clickNum = (imgDegree / 90) % 4;
      for (let i = 0; i < Math.abs(clickNum); i++) {
        // @ts-ignore
        degreeDom?.click();
      }
    }, 300);
  };
  const handleImageRotate = (degreeNum: number) => {
    const params = {
      imageId,
      degree: degreeNum,
      sid,
      wcId,
    };
    requestImageDegree(params);
  };
  const hideViewer = () => {
    setShowViewer(false);
    setDegree(0);
    handleHideCont();
  };
  return (
    <div className="ui-checkimages">
      <div className="modal-img-list">
        {
          imgList.map((item, index) => (
            <div
              key={item.imageId}
              className="modal-img-item"
              onClick={() => toggleShowViewer(index, item.imageId, item.degree)}
            >
              <img
                alt="化验单检查单"
                src={item.url}
                style={{ transform: `rotate(${item.degree}deg)` }}
              />
            </div>
          ))
        }
      </div>
      <Viewer
        visible={showViewer}
        images={imgList.map((image) => ({
          src: image.url,
          alt: '化验单检查单',
          degree: image.degree,
        }))}
        activeIndex={activeIndex}
        scalable={false}
        onClose={hideViewer}
        onRotateClick={handleImageRotate}
        onMaskClick={hideViewer}
        toolBarAppend={(
          <li
            onClick={hideViewer}
            className="react-viewer-btn"
            key="close"
          >
            <span className="viewer__close">关闭</span>
          </li>
        )}
      />
    </div>
  )
}

export default ImageListWrap;
