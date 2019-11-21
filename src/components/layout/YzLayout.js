import React from "react"
// 引入样式文件
import './style.scss'
// 导入页面所需组件
import Sidebar from "./Sidebar"  //页面边栏导航
import Header from "./Header"  //页面边栏导航
import Content from "./contents/Content"  //页面边栏导航

export default class YzLayout extends React.Component {
    render() {
        return (
            <div className="yz_layout">
                <div className="aside">
                    <Sidebar></Sidebar>
                </div>
                <div className="header">
                    <Header></Header>
                </div>
                {/* 页面内容区 */}
                <div className="content">
                    <div className="content_wrap">
                        <Content></Content>
                    </div>
                    {/* 页面底部logo区 */}
                    {/* <div className="foot-logo">
                        <img src="../../assets/images/foot_logo.png" alt="" />
                    </div> */}
                </div>

            </div>
        )
    }
}