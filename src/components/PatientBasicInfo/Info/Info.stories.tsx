import React from "react";
import PatientInfo from './index';

const res = {
  "wcl": [
      {
          "wcId": "dev.eJ1DG4",
          "ns": {
              "id": "dev.Wm7M2e",
              "name": "慢病管理团队空间",
              "labels": [
                  "chronic_disease_team"
              ],
              "superNsIds": [
                  "dev.aeJk0w",
                  "dev.aeJ9z4",
                  "dev.qWGyBe",
                  "dev.YWLLzW"
              ],
              "superNSL": [
                  {
                      "id": "dev.aeJ9z4",
                      "name": "root",
                      "labels": [
                          "global"
                      ],
                      "status": 2,
                      "superNsIds": [
                          "dev.aeJk0w"
                      ]
                  },
                  {
                      "id": "dev.qWGyBe",
                      "name": "xinzhili",
                      "labels": [
                          "default",
                          "chronic_disease_space"
                      ],
                      "status": 2,
                      "superNsIds": [
                          "dev.aeJk0w",
                          "dev.aeJ9z4"
                      ]
                  },
                  {
                      "id": "dev.Wm7M2e",
                      "name": "慢病管理团队空间",
                      "labels": [
                          "chronic_disease_team"
                      ],
                      "status": 2,
                      "superNsIds": [
                          "dev.aeJk0w",
                          "dev.aeJ9z4",
                          "dev.qWGyBe",
                          "dev.YWLLzW"
                      ]
                  },
                  {
                      "id": "dev.YWLLzW",
                      "name": "神经科",
                      "labels": [
                          "department",
                          "neurology_department_type"
                      ],
                      "status": 2,
                      "superNsIds": [
                          "dev.aeJk0w",
                          "dev.aeJ9z4",
                          "dev.qWGyBe"
                      ]
                  }
              ]
          },
          "roles": [
              {
                  "id": "dev.YWLG0L",
                  "name": "患者",
                  "labels": [
                      "consumer"
                  ],
                  "subject": {
                      "id": "dev.70M89e",
                      "name": "用户086",
                      "sex": 1,
                      "height": 177,
                      "weight": 75,
                      "waistline": 27,
                      "tel": "15271841086",
                      "address": "北京 北京市 西城区",
                      "provinceName": "北京",
                      "provinceCode": 1,
                      "cityName": "北京市",
                      "cityCode": 37,
                      "townName": "西城区",
                      "townCode": 396,
                      "detailAddress": "国宾大厦",
                      "bmi": "23.93",
                      "age": 0,
                      "uuCode": "10001254",
                      "abbreviation": "京"
                  },
                  "interval": {
                      "start": 1622109513000
                  },
                  "rsConfig": {
                      "rscId": "dev.W23zl4",
                      "status": 79,
                      "account": "15271841086",
                      "swOwnerWm": true,
                      "swOwnerPricing": true,
                      "clientId": "xzl-patient"
                  }
              }
          ]
      }
  ]
}
export default {
  title: "@PatientBasicInfo/Info",
  component: PatientInfo,
  parameters: {}
};
const callbackData = (data: any) => {
  console.log(221,data);
}
export const Info = () => (
  <PatientInfo
    isYlPatient={0}
    request={() => new Promise((resolve => resolve(res)))}
    apiParams={{}}
    callbackData={callbackData}
  />
);


