// pages/cart/cart.js
//引入全局变量
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    isSelectAll:true,
    totalPrice:0,  
    totalCounter:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cartList:app.globalData.cartList
    })
    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    
    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 2.修改全部选中的状态
      //有购物车一个没有选中，返回一个true,就让全选没选中
      const selectAll = !this.data.cartList.find(item => !item.checked)
      // console.log(selectAll)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },
  onShow() {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })

    this.changeData()
  },
    
  onSelectAll() {
    // 1.判断是否是全部选中
    //如果点击前已全选，就让购物车取消选择
    if (this.data.isSelectAll) { // 目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    } else { // 某些没选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }

    // console.log(counter, totalPrice)

    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})