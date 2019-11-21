import React from "react"
// 按需引入antd
import { Button } from "antd"

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>首页页面</h1>
        <Button type="danger">我是一个按钮</Button>
      </div>
    )
  }
}
export default Home


