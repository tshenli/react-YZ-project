import React from "react"
import { inject, observer } from "mobx-react"

// 引入样式
import "./equity.scss"

// 引入所需组件
import {
  Row,
  Col,
  Button,
  Input,
  Table,
  Tabs,
} from "antd"
const { Search } = Input
const { TabPane } = Tabs

// 注入store,并将TabEquList设置监察者
@inject("store") @observer
class TabEquList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabKey: "0"
    }
  }

  //调取自定义接口数据
  componentDidMount() {
    this.props.store.EquStore.getEquityList()
  }

  // 自定义跳转新建权益卡页面
  skipToEquCreate() {
    // console.log("子组件", this.props)
    // 接收父组件传递过来的事件
    this.props.onSkip()
  }
  // 分页查询
  pageChange(e) {
    console.log("页码：", e.current)  //打印当前页码
    this.props.store.EquStore.getEquListOfPage(e.current)
  }
  // 根据状态进行筛选操作（状态为：1-使用中/2-已禁用/3-已过期）
  statusChange(e) {
    console.log("状态为", e)
    // 设置state值
    this.setState({
      tabKey: e
    })
    this.props.store.EquStore.getEquListOfStatus(e)

  }
  // 根据关键字进行筛选操作
  searchChange(e) {
    console.log("输入的值为：", e)
    this.props.store.EquStore.getEquListOfSearch(e)
  }


  render() {
    // 取出后端传入的数据
    let { list1, list2 } = this.props.store.EquStore
    let { tabKey } = this.state
    list2.map((ele, idx) => {
      let str = ""
      ele.rights.map((ele2, idx2) => {
        switch (ele2) {
          case 1:
            str += "包邮"
            break;
          case 2:
            str += "消费折扣"
            break;
          case 3:
            str += "积分回馈倍率"
            break;
          case 3:
            str += "获得好友体验卡"
            break;
          default:
        }
      })
      list2[idx].rights_str = str
    })

    // 表格头数据
    const columns = [
      {
        title: '权益卡名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '领取条件',
        dataIndex: 'condition',
        key: 'condition',
        // 将标记1/2/3 渲染成文字在表格中显示
        render: (text, row, index) => {
          let receive = ""
          switch (row.condition) {
            case 1:
              receive = "可直接领取"
              break;
            case 2:
              receive = "需付费领取"
              break;
            case 3:
              receive = "满足指定条件领取"
              break;
          }
          return (<span>{receive}</span>)
        }
      },
      {
        title: '有效期',
        dataIndex: 'period',
        key: 'period',
        // 将标记1/2/3 渲染成文字在表格中显示
        render: (text, row, index) => {
          let receive = ""
          switch (row.period) {
            case 1:
              receive = "永久有效"
              break;
            case 2:
              receive = "领卡时起有效"
              break;
            default:
              receive = row.period
             
          }
          return (<span>{receive}</span>)
        }
      },
      {
        title: '权益',
        dataIndex: 'rights_str',
        key: 'rights_str',
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 200,
        align: "right",
        render: () => {
          return (
            <div className="ept_row_actions">
              <a>查看成员</a>
              <a>发卡</a>
              <a>编辑</a>
            </div>
          )
        },
      },
    ];
    return (
      <div className="equ_page_tab1">
        {/* 新建权益卡按钮 + 搜索框 */}
        <div className="ept_header">
          <Row>
            <Col span={4}>
              <Button onClick={this.skipToEquCreate.bind(this)} type="primary">新建权益卡</Button>
            </Col>
            <Col span={17}></Col>
            <Col span={3}>
              <Search
                onSearch={this.searchChange.bind(this)}
                placeholder="请输入权益卡名称"
              />
            </Col>
          </Row>
        </div>

        {/* 三个筛选按钮 */}
        <div>
          <Tabs type="card"
            activeKey={tabKey}
            onChange={this.statusChange.bind(this)}>
            <TabPane tab="使用中" key="1">
            </TabPane>
            <TabPane tab="已禁用" key="2">
            </TabPane>
            <TabPane tab="已过期" key="3">
            </TabPane>
          </Tabs>,
        </div>

        {/* 表格组件 */}
        <div>
          <Table
            onChange={this.pageChange.bind(this)}
            rowKey="id"
            columns={columns}
            dataSource={list2}
            scroll={{ x: 1200 }}
            pagination={{ pageSize: 4, total: list1.length }}
          />
        </div>
      </div>
    )
  }
}

// 抛出
export default TabEquList
