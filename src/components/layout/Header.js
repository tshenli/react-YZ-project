import React from "react"
// 引入样式文件
import './style.scss'
import { Breadcrumb } from 'antd'
import { withRouter } from "react-router";
import { Link } from "react-router-dom"
import router from "@/utils/recursive"

class Header extends React.Component {
  // 创建一个面包屑方法
  createBreadcrumb() {
    let breadArr = []  //面包屑的jsx对象
    let path = this.props.location.pathname
    // split():根据传入的值截取  filter():过滤掉数组中的空值
    let arr = path.split("/").filter(ele => ele)
    // console.log("面包屑：", arr)

    // 处理url问题 
    arr.map((ele, idx) => {
      let url = "/" + arr.slice(0, idx + 1).join('/')
      // console.log("面包屑url：", url)
      // 取出定义路由数据中心的路由名称
      let text = ""
      router.map((ele, idx) => {
        if (ele.path === url) {
          text = ele.text
        }
      })
      breadArr.push(
        <Breadcrumb.Item key={url}>
          <Link to={url}>{text}</Link>
        </Breadcrumb.Item>
      )
    })
    return breadArr
  }


  render() {
    // console.log("withRouter：", this.props.location.pathname)
    // 调用创建面包屑的方法
    this.createBreadcrumb()
    return (
      <div className="yz_layout_header">
        <Breadcrumb>
          {
            this.createBreadcrumb()
          }
        </Breadcrumb>
      </div>
    )
  }
}

export default withRouter(Header)