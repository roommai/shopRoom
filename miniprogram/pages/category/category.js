// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    categoryData:{},
    currentIndex:0,

  },

//------------------事件监听函数-------------------
menuClick(e){
  //1.改变当前的currentIndex
  const currentIndex = e.detail.currentIndex;
  // console.log(currentIndex)
  this.setData({
    currentIndex
  })

  //2.请求对应currentIndex数据,封面图片，标题
  this._getSubcategory(currentIndex);
  // 3.请求对应的currentIndex的详情数据
  this._getCategoryDetail(currentIndex)
},




//-------------------网络请求函数----------------
_getData(){
  //1.请求分类数据
  this._getCategory()
},
_getCategory(){
  getCategory().then(res=>{
    // console.log(res)
    // 1.获取categories 左边分类导航栏
    const categories = res.data.data.category.list;
    // console.log(categories)
    
    // 2.初始化每个类别的子数据
    const categoryData = {}
    for (let i = 0; i < categories.length; i++) {
      categoryData[i] = {
        //分别用两个属性装数据
        subcategories: [],   //分类商品
        categoryDetail: []    //商品详情数据
        // categoryDetail: {
        //   'pop': [],
        //   'new': [],
        //   'sell': []
        // }
      }
    }
    // console.log(categoryData)
    // 3.修改data中的数据
    this.setData({
      categories,
      categoryData
    })
    //4.请求第一类别的数据，初始化
    this._getSubcategory(0)

    // 5.请求第一个类别的详情数据
    this._getCategoryDetail(0)
  })
},
_getSubcategory(currentIndex){
  // 1.获取对应的maitKey,右边对应的商品
  const maitKey = this.data.categories[currentIndex].maitKey;
  // console.log(maitKey)
  // 2.请求数据
  getSubcategory(maitKey).then(res=>{
    console.log(res)
    // 拿到定义好的对象
    const tempCategoryData = this.data.categoryData;
    // console.log(tempCategoryData)
    // 拿到你点击哪个选项的数据
    tempCategoryData[currentIndex].subcategories = res.data.data.list;
    // console.log(tempCategoryData)
    this.setData({
      categoryData:tempCategoryData
    })
  })
},
_getCategoryDetail(currentIndex){
  // 1.获取对应得miniWallKey
  const miniWallKey = this.data.categories[currentIndex].miniWallkey;
  // console.log(this.data.categories[currentIndex].miniWallkey)
  // console.log(miniWallKey)
  // 2.请求数据类别的数据
  this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
},
_getRealCategoryDetail(index, miniWallKey, type) {
  getCategoryDetail(miniWallKey, type).then(res => {
    // 1.获取categoryData
    // console.log(res)
    const categoryData = this.data.categoryData;
    // console.log(categoryData)
    // 2.修改数据
    categoryData[index].categoryDetail = res.data;

    // 3.修改data中的数据
    this.setData({
      categoryData: categoryData
    })
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
  },


})