import React from "react";
import CheckImages, { IImageItem } from './index'
import "../../../styles/index.scss";
import ImageList from '../ImageList/index';

export default {
  title: "@Components/PatientImages",
  component: CheckImages,
  parameters: {}
};
const anaImg: IImageItem[] = [
  {
    "category": 0,
    "typeNew": "dev.MXnnXK8NY",
    "name": "Atest",
    "count": 1,
    "lastReportAt": 1626773281729,
  },
  {
      "category": 0,
      "typeNew": "dev.kk77kwb7R",
      "name": "Atest6",
      "count": 1,
      "lastReportAt": 1626771070169,
  },
  {
      "category": 0,
      "typeNew": "dev.rk88k1kxm",
      "name": "D-二聚体",
      "count": 1,
      "lastReportAt": 1626773425031,
  },
  {
      "category": 0,
      "typeNew": "dev.xk88knknD",
      "name": "内分泌六项",
      "count": 1,
      "lastReportAt": 1626848781544,
  }
];
const otherImg: IImageItem[] = [
  {
    "category": 2,
    "typeNew": "dev.V0XqWB",
    "name": "待审核图片",
    "count": 1
  },
  {
      "category": 2,
      "typeNew": "dev.aeJk0w",
      "name": "图片不清晰",
      "count": 0
  },
  {
      "category": 2,
      "typeNew": "dev.qWGr0B",
      "name": "非化验单检查单",
      "count": 0
  }
]
const imageInfos = [
  {
    "imageId": "dev.YWL1g421",
    "uploadTime": 1625449929676,
    "url": "https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/1e91b7a7-3c3a-47b3-909d-1c556e474be6检查单.png",
    "reviewStatus": "REVIEW",
    "status": 1,
    "degree": 0
  },
  {
    "imageId": "dev.YWL1g4",
    "uploadTime": 1625449929676,
    "url": "https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/6fe1ab88-ca74-4954-a542-b6987dcff57f夜景.jpg",
    "reviewStatus": "REVIEW",
    "status": 1,
    "degree": 0
  }
];
export const Images = () => (
  <CheckImages
    anaImg={anaImg}
    insImg={[]}
    otherImg={otherImg}
    imageListCom={(prop: any) => <ImageList
      {...prop}
      sid="ssid"
      wcId="wcidd"
      request={() => new Promise((resolve) => resolve({imageInfos}))}
      requestImageDegree={() => new Promise((resolve) => resolve({}))}
    />
    }
  />
);

