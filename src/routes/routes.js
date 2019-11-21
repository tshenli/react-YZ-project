import Home from "./home/Home"
import Equity from "./equity/Equity"
import EquCreat from "./equity_creat/EquCreat"

const routes = [
  {
    id: 1,
    path: "/",
    text: "概况",
    icon: "global",
    component: Home,
  },
  {
    id: 2,
    path: null,
    text: "店铺",
    icon: "shop",
    component: null,
  },
  {
    id: 3,
    path: null,
    text: "商品",
    icon: "tag",
    component: null,
  },
  {
    id: 4,
    path: null,
    text: "订单",
    icon: "profile",
    component: null,
  },
  {
    id: 5,
    path: null,
    text: "客户",
    icon: "user",
    component: null,
    sub: [
      {
        id: 501,
        path: "/equity",
        text: "权益卡",
        component: Equity,
        children: [
          {
            id: 50101,
            path: "/equity/equ",
            text: "新建权益卡",
            component: EquCreat,
          }
        ]
      }
    ]
  },
  {
    id: 6,
    path: null,
    text: '数据',
    component: null,
    icon: 'bar-chart'
  },
  {
    id: 7,
    path: null,
    text: '资产',
    component: null,
    icon: 'pay-circle'
  }

]

export default routes