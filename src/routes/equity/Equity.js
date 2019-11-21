import React from "react"

// 引入子组件
import TabEquList from "./TabEquList"
// 引入样式
import "./equity.scss"

import { Tabs } from 'antd';
const { TabPane } = Tabs;



class Home extends React.Component {
  // 自定义父组件事件
  skipToEquCreate() {
    // console.log("父组件", this.props)
    this.props.history.push("/equity/equ")
  }
  render() {
    return (
      <div className="equ_content">
        <Tabs defaultActiveKey="1">
          <TabPane tab="权益卡管理" key="1">
            {/* 给子组件传递一个跳转事件 */}
            <TabEquList onSkip={this.skipToEquCreate.bind(this)}></TabEquList>
          </TabPane>
          <TabPane tab="领卡记录" key="2">
            Content of Tab Pane 2
            </TabPane>
          <TabPane tab="退卡记录" key="3">
            Content of Tab Pane 3
            </TabPane>
        </Tabs>

      </div>
    )
  }
}
export default Home


