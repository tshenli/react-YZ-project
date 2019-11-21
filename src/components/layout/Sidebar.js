import React from "react"
// 引入样式文件
// import './style.scss'

// 引入路由所需配置文件
import { NavLink } from "react-router-dom"
import routes from "@/routes/routes.js"
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="yz_layout_sidebar">
        <Menu
          mode="inline"
          theme="dark"
        >
          {/* 生成menu */}
          {
            routes.map((ele, idx) => {
              // 判断是否存在二级导航链接
              if (ele.sub && ele.sub.length > 0) {
                return (
                  <SubMenu
                    key="{ele.id}"
                    title={
                      <span>
                        <Icon type={ele.icon} />
                        <span>{ele.text}</span>
                      </span>
                    }
                  >
                    {
                      ele.sub.map((ele2, idx2) => {
                        return (
                          <Menu.Item key={ele2.id}>
                            <NavLink exact to={ele2.path}>
                              {ele2.text}
                            </NavLink>
                          </Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                )
              } else {
                if(ele.path) {
                  return (
                    <Menu.Item key={ele.id}>
                      <NavLink exact to={ele.path}>
                        <Icon type={ele.icon} />
                        <span>{ele.text}</span>
                      </NavLink>
                    </Menu.Item>
                  )
                } else {
                  return (
                    <Menu.Item key={ele.id}>
                        <Icon type={ele.icon} />
                        <span>{ele.text}</span>
                    </Menu.Item>
                  )
                }
                
              }
            })
          }
        </Menu>
      </div>
    )
  }
}