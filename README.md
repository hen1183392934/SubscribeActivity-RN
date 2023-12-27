# entry-task

## 简介

一个活动分享的社交平台。访客可以根据一些过滤条件来浏览活动、点赞或加入活动，以及查看其他人的资料与发起的活动。

## 启动

### 运行前端代码

```
npm install -g expo-cli

expo install

expo start
```

### 运行 api 代码

```
git clone https://git.garena.com/jinyang.li/pangolier.git

npm install

npm start
```

注意：

- node server 的默认端口是 3000，如果被占用，可以在 pangolier/config.yml 修改

- 为了使 front-end 请求发送到本地 node server，需要修改 ip 请求地址为本地 ip，修改[fecthRequest](apis/fecthRequest.ts)文件中的 commonUrl

## 项目目录

主要目录：

- apis -- 请求相关
- assets -- 静态资源
- components -- 组件
- language -- 国际化处理相关
- screens -- 页面
- store -- store 状态管理
- theme -- 样式主题
- App.tsx -- 入口
