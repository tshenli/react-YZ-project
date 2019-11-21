import { observable, action } from "mobx"
import { getUserList, getEquityList } from "../untils/api"

// 创建一个Store
class Store {
    @observable msg = "hello 19"
    @observable page = 1
    @action updateMsg() {
        this.msg = "hello world"
        getUserList({}, res => {
            console.log("你好啊", res)
        })
        getEquityList({ page: this.page }, res => {
            console.log("权益卡列表", res)
        })
    }
}

export default new Store()