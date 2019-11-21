import EquStore from "./equStore"

// 创建一个Store
class Store {
   constructor(){
     this.EquStore = new EquStore()  //实例化EquStore
   }
}

export default new Store()