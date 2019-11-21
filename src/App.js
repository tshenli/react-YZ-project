import React from 'react';

// 引入路由所需API
import { HashRouter, NavLink, Route, Switch, Redirect } from "react-router-dom"

// 引入自定义路由文件
import routes from "@/routes/routes"

// 引入自定义Store文件
import store from "@/store/store.js"
import { Provider } from "mobx-react"

// 引入样式
import "@/assets/css/commont.scss" //自定义全局样式
import "antd/dist/antd.css"  //antd自带样式

// 引入自定义的组件
import { YzLayout } from "@/components/components.js"
import Login from "@/components/login/Login.js"


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true
    }
  }
  /* // 封装渲染路由方法
  createNavLink(arr) {
    let linkArr = []
    arr.map((ele, idx) => {
      linkArr.push(
        <NavLink exact key={ele.id} to={ele.path}>{ele.text}</NavLink>
      )
    })
    return linkArr
  }

  // 封装渲染组件方法
  createRoute(arr) {
    let linkArr = []
    arr.map((ele, idx) => {
      linkArr.push(<Route exact key={ele.id} path={ele.path} component={ele.component}></Route>)
      if (ele.children && ele.children.length > 0) {
        ele.children.map((ele2, idx2) => {
          linkArr.push(<Route exact key={ele2.id} path={ele2.path} component={ele2.component}></Route>)
        })
      }
    })
    return linkArr
  } */

  render() {
    let { isLogin } = this.state
    return (
      <HashRouter>
        <Provider store={store}>
          <div className="app" >
            {/* 登录拦截 */}
            {
              isLogin ? <YzLayout></YzLayout> : <Login></Login>
            }


            {/* 渲染路由
            {
              this.createNavLink(routes)
            }

            <Switch>
              渲染组件
              {
                this.createRoute(routes)
              }
              设置重定向
              <Redirect from="/*" to="/"></Redirect>
            </Switch> */}
          </div>
        </Provider>
      </HashRouter >
    );
  }
}


