## 1. 需求分析

需求：实现一个活动分享的社交平台。访客可以根据一些过滤条件来浏览活动、点赞或加入活动，以及查看其他人的资料与发起的活动。

- 从页面角度分析功能点：  
  项目包括以下几个主要页面：登录页、列表页、详情页、个人中心页；

| 页面       | 功能                                       | 用户操作                                              |
| ---------- | ------------------------------------------ | ----------------------------------------------------- |
| 登录页     | 登录                                       | 1.已登录用户->跳转活动列表； 2.未登录用户->跳转登录页 |
| 列表页     | 查看活动、搜索活动                         | 1.无限滚动查看；2.搜索条件选择；3.搜索结果展示        |
| 详情页     | 查看详情、点赞、评论；评论、点赞、参与活动 | 1.点击活动->跳转详情页； 2.详情页点赞、评论、参加活动 |
| 个人中心页 | 查看个人信息、点赞、参与活动信息           | 点赞、想参与与已参与活动为列表形式                    |

- 页面跳转关系
  1. 已登录用户->跳转活动列表；未登录用户->跳转登录页
  2. 头部导航栏(活动列表页)点击左侧搜索->搜索栏
  3. 头部导航栏点击个人头像->个人中心页
  4. 头部导航栏点击左侧主页->活动列表页
  5. 活动列表页点击活动->详情页

## 2. 设计方案

针对本次项目的相关设计如下：

### 2.1 UI 组件设计

页面根据功能或结构划分出不同组件，本次项目中共有 13 个组件，大方向上划分为通用组件和页面特定组件。

#### 2.1.1 通用组件

通用组件有 Header、MyToast、NoResult、TabBar、List5 个，相关说明如下：
组件| 说明 | 引用页面
---|---|---
Header|已登录页面的头部导航栏 | 列表页、详情页、个人中心页
MyToast|统一封装的提示信息样式| 详情页
NoResult|无数据组件|列表页、个人中心页
TabBar|用于切换的页签组件|详情页、个人中心页
List|用于展示活动列表|列表页、个人中心页

#### 2.1.2 页面组件

页面组件根据具体页面详细说明：

- 登录页  
  登录页与其他页面暂无相似组件，内容也不复杂并未特定划分组件；  
  整体页面包括标题、输入登录信息的表单、登录按钮。
- 列表页  
  列表页主要分为头部导航栏、活动列表以及搜索三大部分，头部导航栏多个页面使用，划分为公共组件；活动列表包含搜索结果的提示，以及活动简介信息的展示，活动列表个人中心也会用到，所以也划分为公共组件，但活动列表内每个活动简介结构类似，划分出组件 Activity 根据数据循环展示；列表页组件结构如下：

  - 列表页 - ListScreen
    - 头部导航栏（公用组件）- Header
    - 抽屉式搜索 - Search
    - 搜索结果信息 - ResultInfo
    - 活动列表（公用组件）- List
      - 活动简介 - Activity

- 详情页  
  详情页主要分为  
  头部导航栏，活动标题、频道、用户、发布时间的展示模块，  
  详情、参与用户、评论切换查看页签栏，  
  以及展示活动图片、描述、时间、地点的详情模块，  
  查看参与点赞用户的模块，因点赞与参与用户展示用户列表结构类似，划分出组件 User 根据数据循环展示用户，  
  展示评论的模块以及底部可以对活动操作的操作栏,  
  详情页的组件结构如下：

  - 详情页-DetailScreen
    - 头部导航栏（公用组件）- Header
    - 切换查看栏（公用组件）- TabBar
    - 活动图片、描述、时间、地点详情 - Detail
    - 参与、点赞用户 - Participants
      - 用户列表 Users
    - 评论信息 - Comments
    - 底部操作栏 - BottomOperator

- 个人中心页  
  个人中心页主要分为头部导航栏，个人信息简介，切换查看点赞、即将参与、已经参与过的活动栏，活动列表，个人中心页的组件结构如下：
  - 个人中心页 - MeScreen
    - 头部导航栏（公用组件）- Header
    - 切换查看栏（公用组件）- TabBar
    - 活动列表（公用组件）- List

### 2.2 store 设计

store 中需要包含所有需要在全局共用的数据，主要有登录用户信息、活动列表信息、活动详情信息的数据，依据页面详细说明如下：

#### 2.2.1 登录

登录后需要存储用户的登录信息，所以在 store 中 LoginIfo 存储用户 token 以及用户名等用户信息,具体类型定义如下：

```
export interface User {
    id: number
    username: string
    email: string
    avatar: string
    likes_count?: number
    past_count?: number
    goings_count?: number
}
export interface LoginInfo {
    token: string
    user: User
}
```

#### 2.2.2 活动列表

活动列表页需要的数据有：直接从请求中得到的活动信息的数组，用于搜索的频道信息数组，搜索选中的时间段与频道，是否还有更多活动的标识，具体类型定义如下：

```
export interface EventListData {
    events: Event[]
    channels: EventChannel[]
    selectedChannels: number[]
    selectedDateIndex: number
    hasMore: boolean
}
export interface Event {
    id: number
    name: string
    begin_time: string
    end_time: string
    description: string
    creator: User
    create_time: string
    channel: EventChannel
    images: string[]
    location: string
    location_detail: string
    goings_count: number
    likes_count: number
    me_likes: boolean
    me_going: boolean

    participantsUsers: User[]
    likesUsers: User[]

    comments: EventComment[]
}
export interface EventChannel {
    id: number
    name: string
}
```

#### 2.2.3 详情

详情页需要的数据有：直接从请求中得到的活动的基础信息，活动的参与用户数组，点赞用户数组，评论信息数组，具体类型定义如下：

```
export interface Event {
    id: number
    name: string
    begin_time: string
    end_time: string
    description: string
    creator: User
    create_time: string
    channel: EventChannel
    images: string[]
    location: string
    location_detail: string
    goings_count: number
    likes_count: number
    me_likes: boolean
    me_going: boolean

    participantsUsers: User[]
    likesUsers: User[]

    comments: EventComment[]
}
export interface Comments {
    comments: EventComment[]
}
export interface EventChannel {
    id: number
    name: string
}
```

#### 2.2.4 个人中心

个人中心需要的数据有：用户信息，活动列表信息用于筛选用户相关的活动，这些都可从以上数据中拿到，不需要另设数据存储。

### 2.3 无限滚动设计

活动列表的无限滚动包含无限与滚动两个功能。首先滚动顾名思义，其次活动的数据有可能很庞大，不可能一次性加载所有数据，有必要进行分页处理，即一次性加载固定条数数据，触发再次加载条件后再加载数据，反应到这边就是在列表滚动触底时进行加载，这就是无限。

本次项目中无限滚动功能实现借助了第三方库[RecyclerListView](https://github.com/Flipkart/recyclerlistview)。 初始时请求 25 条活动数据，使用 onEndReached 方法在滚动触底时动态加载 25 条活动数据，获得数据后它会对数据进行对比，自动判断可复用以及需要重新渲染的组件。

React Native 的其他列表组件如 ListView ,会一次性创建所有的列表单元格—— cell 。如果列表数据比较多，则会创建很多的视图对象，而视图对象是非常消耗内存的。所以， ListView 组件，对于我们业务中的这种无限列表，基本上是不可以用的。

React Native 官方提供的高性能列表组件 FlatList 与 RecyclerListView 的实现原理都是在长列表的滚动中，只展示当前可见的视图，而 recyclerListView 的优点在于 重用单元格，对比 FlatList 的重复清除内存，再重新创建更有性能与体验优势。

### 2.4 技术栈与第三方库

本次项目中使用的主要技术栈为 React-Native、Redux、React-Navigation 等常用技术栈，不多说明，此外项目中引用的其他第三方库还有：

- [RecyclerListView](https://github.com/Flipkart/recyclerlistview)用于实现无限滚动列表；
- [react-native-root-toast](https://github.com/magicismight/react-native-root-toast)用于实现信息提示，expo 官方推荐，可以支持在 iOS 和 Android 上运行；
- [react-native-drawer](https://github.com/root-two/react-native-drawer)用于实现活动搜索的抽屉式抽拉效果，支持在 iOS 和 Android 上运行；
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)用于显示 svg 图标，支持像定义文字方式定义 svg 图标的大小颜色等样式，方便快捷；
- [react-native-map](https://github.com/react-native-maps/react-native-maps)用于显示地图等等。

## 3. 问题与解决

在本次项目开发中遇到的一些问题与解决如下：

1. 问题：点赞、参与活动、评论请求在 postman 请求成功，项目中却总是失败  
   原因：用户点赞、参与活动、评论成功时，请求返回空值，导致 json 解析错误  
   解决：在请求后判断实际状态码判断是否成功，进行处理。
2. 问题：首次引入 redux 与 saga 后报错：
   ```
   Error: Invalid hook call. Hooks can only be called inside of the body of a function component.
   ```
   原因：在函数式组件外部使用 useDispatch，useDispatch 是 redux 提供的 hook 函数，hook 函数要在函数式组件内部执行  
   解决：在函数式组件内部使用 useDispatch
3. 问题：尝试使用手机查看项目，请求失败  
   原因：手机远程访问 node 需要修改后端 API 项目代码  
   解决：修改后端 API 项目中 app.js 中 fastify.listen 第二个参数为：'0.0.0.0'
4. 问题：进入详情页时会直接请求点赞或取消点赞  
   原因：详情页中点赞为自定义的变量，在 useEffect 中监听状态变化进行处理，导致进入页面时就会触发一次  
   解决：使用 store 数据中的点赞状态，在点赞或取消点赞时才进行处理
5. 问题：详情页描述过长时省略并显示 viewall 按钮，点击需要省略描述的活动后，再点击一个不需要省略描述的活动时，viewall 还是显示出来  
   原因：描述 onLayout 时只在高度大于限定高度时进行处理，而高度小于限定高度时未处理用来标识是否显示 viewall 的变量  
   解决：描述 onLayout 时，是否显示 viewall 的变量设置为高度大于或者小于限定高度的结果

## 4.建议与改进

- fecth api 的封装
  - 使用泛型规范返回值类型
  - 不要嵌套 promise
  - 封装考虑到的情况较少，需要更加全面的考虑
- 搜索后滚动重置
- 详情中滚动吸顶处理
- 封装处理下划线与驼峰命名不同问题
- 不要在公共组件内传入 navigation 变量，可以抛出 click 方法到外面处理
- 查看 saga 除 takeEvery 其他方法，理解区别，熟悉使用
- 查看 useMemo，useEffect，useCallback 区别
- ts 泛型的使用
- 表达描述能力需要加强

## 总结

本次项目是我第一次接触 RN 项目，第一次使用 ts，第一次做移动端项目，项目上手花了较长时间，一边查阅文档一边编写代码渐渐熟悉后完成了项目现在的样子，项目仍有很多不足，比如 fectch 的封装，ts 的使用等等，后期有余力，希望能够继续改善。
