import React from "react"

import { Route, Switch } from "react-router-dom"
// import routes from "@/routes/routes"
import recursive from "@/utils/recursive"

export default class Content extends React.Component {
  // 生成Route容器
/*   createRoute(arr) {
    let routeArr = []
    // 循环遍历一级组件
    arr.map((ele, idx) => {
      if (ele.path && ele.component) {
        routeArr.push(
          <Route key={ele.id} path={ele.path} exact component={ele.component}></Route>
        )
      }
      if (ele.sub && ele.sub.length > 0) {
        // 循环遍历二级组件
        ele.sub.map((ele2, idx2) => {
          routeArr.push(
            <Route key={ele2.id} path={ele2.path} exact component={ele2.component}></Route>
          )
          if (ele2.children && ele2.children.length > 0) {
            // 循环遍历三级组件
            ele2.children.map((ele3, idx3) => {
              routeArr.push(
                <Route key={ele3.id} path={ele3.path} exact component={ele3.component}></Route>
              )
            })
          }
        })
      }
    })
    return routeArr
  } */

  // 升级版Route渲染写法
  createRoutUpdate(arr) {
    let routeArr = []
    arr.map((ele, idx) => {
      if (ele.path && ele.component) {
        routeArr.push(
          <Route key={ele.id} path={ele.path} exact component={ele.component}></Route>
        )
      }
    })
    return routeArr
  }

  render() {
    return (
      <div className="yz_layout_content">
        {/* 渲染组件 */}
        <Switch>
          {
            // this.createRoute(routes)
            this.createRoutUpdate(recursive)
        }
          {/* 设置重定向 */}
          {/*<Redirect from='/*' to='/card'></Redirect>*/}
        </Switch>
      </div>
    )
  }
}