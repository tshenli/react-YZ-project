import React from "react"

// 引入样式文件
import "./equcreate.scss"
import moment from "moment"
import { inject, observer } from "mobx-react"

// 引入所需组件
import {
  Row,
  Col,
  Input,
  Radio,
  DatePicker,
  Checkbox,
  Icon,
  Switch,
  Select,
  Button
} from "antd"
const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

@inject("store") @observer
class EquCreat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",//卡的名称
      period: 1,  //卡的有效期  1-永久有效 2-领卡时起 3-从哪天到哪天
      periodTime: "",
      condition: 1,   //领取条件
      rights: [1]  //权益
    }
  }
  // 获取卡名称
  nameChange(e) {
    this.setState({ name: e.target.value })
  }
  // 获取卡有效期
  periodChange(e) {
    this.setState({ period: e.target.value })
  }
  // 获取时间区域（有效期）
  dataChange(e) {
    if (e && e.length == 2) {
      this.setState({
        periodTime: e[0].format("YYYY-MM-DD") + "至" + e[1].format("YYYY-MM-DD")
      })
    }
  }
  // 获取卡的领取条件
  conditionChang(e) {
    console.log("领取条件为：" + e.target.value)
    this.setState({ condition: e.target.value })
  }
  // 获取权益项数据
  rightsChange(e) {
    // console.log(e.target.checked, e.target.value)
    let arr = this.state.rights
    if (e.target.checked) {
      arr.push(e.target.value)
    } else {
      let idx = arr.findIndex(ele => ele === e.target.value)
      arr.splice(idx, 1)
    }
    this.setState({ rights: [...new Set(arr)] })
  }

  // 定义提交按钮事件
  submit() {
    const period = this.state.period
    const periodTime = this.state.periodTime
    const data = {
      name: this.state.name,
      period: period === 3 ? periodTime : period,
      condition: this.state.condition,
      rights: this.state.rights
    }
    // 数据类型校验
    this.props.store.EquStore.add(data)
    // 提交数据成功，跳转至首页
    this.props.history.replace("/equity")

    console.log("入参", data)
  }

  render() {
    let { name, period, condition, rights } = this.state
    const options1 = [
      { label: '包邮', value: "1" },
      { label: '消费折扣', value: "2" },
      { label: '积分回馈倍率', value: "3" },
      { label: '获得好友体验卡', value: "4" },
    ]
    options1.map((ele, idx) => {
      let idx2 = rights.findIndex(ele2 => ele2 == ele.value)
      if (idx2 !== -1) {
        options1[idx].checked = true
      } else {
        options1[idx].checked = false
      }
    })
    // console.log("options1", options1)

    const options2 = [
      { label: '送积分', value: '1' },
      { label: '送优惠券', value: '2' },
      { label: '送赠品', value: '3' },
    ];
    const options3 = [
      { label: '会员', value: '1' },
      { label: '非会员', value: '2' },
      { label: '超级会员', value: '3' },
    ];
    return (
      <div className="page_equ_create">
        <div className="pec_block_wrap">
          {/* 基本信息 */}
          <div className="pec_block">
            <div className="pec_block_title">基本信息</div>
            {/* 第一行：名称 */}
            <Row type="flex" align="middle" className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span>*</span>
                  <span>名称：</span>
                </div>
              </Col>
              <Col span={4}>
                {/* 入参：name */}
                <Input
                  value={name}
                  onChange={this.nameChange.bind(this)}
                  placeholder="最多输入9个字符"
                />
              </Col>
            </Row>
            {/* 第二行：背景设置 */}
            <Row className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span>*</span>
                  <span>背景设置：</span>
                </div>
              </Col>
              <Col span={3}>
                <Radio.Group>
                  <Radio value={1}>
                    <span>背景色</span>
                  </Radio>
                  <Radio value={2} className="pec_block_radio">
                    <span>背景图</span>
                  </Radio>
                </Radio.Group>
              </Col>
            </Row>
            {/* 第三行：卡有效期 */}
            <Row className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span>*</span>
                  <span>卡有效期：</span>
                </div>
              </Col>
              <Col span={12}>
                {/* 入参：period */}
                <Radio.Group
                  value={period}
                  onChange={this.periodChange.bind(this)}
                >
                  <div>
                    <Radio value={1}>
                      永久有效
                    </Radio>
                  </div>
                  <div className="pec_block_radio">
                    <Radio value={2}>
                      领卡时起
                    </Radio>
                  </div>
                  <div>
                    <Radio value={3}>
                      <RangePicker
                        disabled={period !== 3}
                        defaultValue={[moment("2019-11-20"), moment("2020-11-20")]}
                        onChange={this.dataChange.bind(this)}
                      />
                    </Radio>
                  </div>
                </Radio.Group>
              </Col>
            </Row>
            {/* 第四行：领取设置 */}
            <Row className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span></span>
                  <span>领取设置：</span>
                </div>
              </Col>
              <Col span={4}>
                {/* 入参：condition */}
                <Radio.Group
                  value={condition}
                  onChange={this.conditionChang.bind(this)}
                >
                  <Radio value={1}>
                    <span>可直接领取</span>
                  </Radio>
                  <Radio value={2} className="pec_block_radio">
                    <span>需付费购买</span>
                  </Radio>
                  <Radio value={3}>
                    <span>满足任意一条件即到账</span>
                  </Radio>
                </Radio.Group>
              </Col>
            </Row>
            {/* 第五行：使用须知 */}
            <Row className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span>*</span>
                  <span>使用须知：</span>
                </div>
              </Col>
              <Col span={10}>
                <TextArea rows={4} placeholder="请输入权益卡相关的补充信息，最多可输入250个字符" />
              </Col>
            </Row>
            {/* 第六行：客服电话 */}
            <Row type="flex" align="middle" className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span></span>
                  <span>客服电话：</span>
                </div>
              </Col>
              <Col span={4}>
                <Input placeholder="请输入手机号或固定电话" />
              </Col>
            </Row>
          </div>
          {/* 权益礼包 */}
          <div className="pec_block">
            <div className="pec_block_title">权益礼包</div>
            {/* 第一行：权益 */}
            <Row className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span></span>
                  <span>权益：</span>
                </div>
              </Col>
              <Col span={10}>
                {
                  options1.map((ele, idx) => {
                    return (
                      <div className="pec_block_checkbox" key={idx}>
                        <Checkbox
                          value={ele.value}
                          onChange={this.rightsChange.bind(this)}
                          checked={ele.checked}
                        >{ele.label}
                        </Checkbox>
                      </div>
                    )
                  })
                }
                <div><a>更多权益</a></div>
              </Col>

            </Row>
            {/* 第二行：领卡礼包 */}
            <Row className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span></span>
                  <span>领卡礼包：</span>
                </div>
              </Col>
              <Col span={10}>
                <div className="pec_block_top">领卡礼包仅在权益卡首次领取和续费时发放</div>
                {
                  options2.map((ele, idx) => {
                    if (idx === 2) {
                      return (
                        <div className="pec_block_checkbox" key={idx}>
                          <Checkbox>{ele.label}</Checkbox>
                          <Icon type="question-circle"></Icon>
                        </div>
                      )
                    } else {
                      return (
                        <div className="pec_block_checkbox" key={idx}>
                          <Checkbox>{ele.label}</Checkbox>
                        </div>
                      )
                    }
                  })
                }
                <div>权益不够用？<a>去配置权益</a></div>
              </Col>

            </Row>
          </div>
          {/* 高级设置 */}
          <div className="pec_block">
            <div className="pec_block_title">高级设置</div>
            {/* 第一行：激活设置 */}
            <Row className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span></span>
                  <span>激活设置：</span>
                </div>
              </Col>
              <Col span={4}>
                <Switch defaultChecked />
                <span className="pec_block_preview">预览</span>
              </Col>

            </Row>
            {/* 第二行：同步微信卡包 */}
            <Row className="pec_block_row">
              <Col span={5}>
                <div className="pec_block_lable">
                  <span></span>
                  <span>同步微信卡包：</span>
                </div>
              </Col>
              <Col span={12}>
                <div className="pec_block_package">未绑定认证的服务号或订阅号,
              <a >去绑定</a>
                </div>
                <div className="pec_block_package">未认证的订阅号或服务号建议
              <a >申请代制卡券</a>
                </div>
              </Col>

            </Row>
            {/* 第三行：分享设置 */}
            <Row className="pec_block_row">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span></span>
                  <span>分享设置：</span>
                </div>
              </Col>
              <Col span={4}>
                <Checkbox>允许分享</Checkbox>
              </Col>

            </Row>
            {/* 第四行：过期设置 */}
            <Row className="pec_block_row" type="flex" align="middle">
              <Col span={4}>
                <div className="pec_block_lable">
                  <span></span>
                  <span>过期设置：</span>
                </div>
              </Col>
              <Col span={20}>
                <span className="pec_block_overdue">卡过期后，消费者变更至</span>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="非会员"
                  optionFilterProp="children"
                >
                  {
                    options3.map((ele, idx) => {
                      return (
                        <Option key={idx} value={ele.value}>{ele.label}</Option>
                      )
                    })
                  }
                </Select>
              </Col>

            </Row>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="pec_block_btns">
          <Button
            onClick={this.submit.bind(this)}
            className="pec_block_btn"
            type="primary"
          >保存</Button>
          <Button className="pec_block_btn">取消</Button>
        </div>
      </div>
    )
  }
}

// 抛出
export default EquCreat


