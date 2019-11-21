import { observable, action } from "mobx"
// 获取接口调用方法（在api中）
import { getEquityList } from "@/utils/api"

class EquStore {
  @observable list = []  //放置所有的数据
  @observable list1 = []  //用于增删查改的逻辑（数据处理的地方  备份数据）
  @observable list2 = []  //用于页面的渲染显示
  @observable list3 = []

  // 获取权益卡列表
  @action getEquityList() {
    getEquityList({ page: 1, size: 2 }, res => {
      // console.log("权益卡", res)
      this.list = [...this.list3, ...res]
      this.list1 = [...this.list3, ...res]
      // 初始化  默认实现第一页的数据
      this.updateList2(1)
    })
  }

  // 定义改变list的方法
  @action updateList2(page) {
    this.list2 = this.list1.slice((page - 1) * 4, page * 4)
  }

  // 获取列表的页码，通过传递过来的页码调用修改list的方法来实现页码分页查询
  @action getEquListOfPage(payload) {
    const page = payload
    this.updateList2(page)
  }
  // 通过状态码进行筛选
  @action getEquListOfStatus(payload) {
    const status = payload
    // 过滤list中符合点击状态码的数据
    const res = this.list.filter(ele => {
      return ele.status == status
    })
    // console.log("filter", res)
    // 将符合条件的数据赋值给备份数据list1
    this.list1 = res
    // 调用分页方法  默认显示第一页数据
    this.updateList2(1)
  }


  // 通过关键字进行筛选
  @action getEquListOfSearch(payload) {
    const searchText = payload.trim() //trim():表示删除前后空格
    // 通过过滤list中存在的字段
    let res = this.list.filter(ele => {
      // 过滤条件：卡名称中存在我们要搜索的字段 （-1表示搜索不到对应的数据）
      return ele.name.indexOf(searchText) !== -1
    })
    console.log("关键字为：", res) //打印数据库中含有关键字的数据
    // 进行页面数据的重新渲染及分页
    this.list1 = res
    this.updateList2(1)
  }

  // 添加权益卡方法
  @action add(payload) {
    const equity = payload
    equity.id = Date.now()
    equity.status = 1
    this.list3.unshift(equity)
  }
}
// 抛出
export default EquStore