// pages/detail/detail.js
import{
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo,
} from '../../service/detail.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid:'',
    topImages: [],
    baseInfo:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:{},
  },
 //-------------------事件监听函数-----------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.iid)
    // 1.获取传入的iid
    this.setData({
      iid:options.iid
    })

    // 2.请求商品详情数据
    this._getDetailData()

    // 3.请求推荐的数据
    this._getRecommends()
  },

  //-----------------网络请求函数--------------------
  _getDetailData(){
    getDetail(this.data.iid).then(res=>{
      // console.log(res)
      const data = res.data.result;
      // console.log(data)

      // 1.取出顶部轮播图组件
      const topImages = data.itemInfo.topImages;
      // console.log(topImages)

      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services) 
      // console.log(baseInfo)

      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);
      // console.log(shopInfo)

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;
      // console.log(detailInfo)

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0];
        // console.log(commentInfo)
      }
      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo,
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      // console.log(res)
      this.setData({
        recommends: res.data.data.list
      })
    })
  },

  // 购物车
  onAddCart(){
    //1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;
    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})