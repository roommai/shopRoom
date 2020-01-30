// components/m-goods-item/m-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(event){
      // 1.获取id
      // console.log(event)
      const iid = this.data.item.iid || this.data.item.item_id;
      // console.log(iid)
      // console.log(this.data)
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' +iid,
      })
    }
  }
})
