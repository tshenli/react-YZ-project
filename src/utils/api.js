import axios from "axios"

function fetch(api, method, data, callback) {
    return axios({
        url: "http://localhost:3000" + api,
        method: method,
        data: data
    }).then((res) => {
        // console.log("接口连接成功", res)
        let data = null
        if (res.data.code === 1) {
            data = res.data.data
        }
        callback && callback(data)
    }).catch((err) => {
        console.log("接口连接异常！", err)
    }).then(() => {
        // 连接不论成功与否，都会执行
    })
}

// 调取用户json数据
export function getUserList(data, callback) {
    fetch("/db/user.json", "GET", data, res => {
        callback && callback(res)
    })
}
// 调取权益卡列表数据
export function getEquityList(data, callback) {
    fetch("/db/equity.json", "GET", data, res => {
        callback && callback(res)
    })
}