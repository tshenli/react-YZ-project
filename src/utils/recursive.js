// 引入routees
import routes from "@/routes/routes"
// 定义一个一维数组
let recursive = []
// 封装递归方法:将多层级路由转化成一层级路由
function recursiveToArray(routes) {
  // 获取第一层数据
  recursive = [...recursive, ...routes]
  routes.map((ele, idx) => {
    if (ele.children && ele.children.length > 0) {
      recursiveToArray(ele.children)
    }
    if (ele.sub && ele.sub.length > 0) {
      recursiveToArray(ele.sub)
    }
  })
}
recursiveToArray(routes)

export default recursive 