### 简单的前端组件库uikit----storybook

 - typescript
 - react-hooks
 - storybook
 - scss
 - jest
 - travis
 - docker
 
 - 本

 <!-- 
 本地启动1
 yarn storybook


打包发布xzl-uikit
1.yarn build-project
复制package文件
2.yarn fuzhi-pag
进入dist
3. cd dist
发布到私有库
4.npm publish
2021.8.5备注，以上三步合为一步，npm go


 发布到xzl仓库或npm上

 xzl:
 nrm ls
 nrm use xzlcorp // 更改源
 备注：
 package.json 增加仓库地址publishConfig
 添加xzl私有仓库地址
  "publishConfig": {
    "registry": "https://repo.xzlcorp.com/repository/nps-local/"
  },

 npm:
 nrm use npm  // 指向npm
 package.json删除掉xzl仓库地址publishConfig
 备注：
 直接执行npm go有可能会发布失败，可依次执行1，2，3，4步骤

  -->
  
