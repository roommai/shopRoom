// pages/category/childCpns/m-menu/m-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(e){
      // 改变为选中状态
      const currentIndex = e.currentTarget.dataset.index
      // console.log(currentIndex)
      this.setData({
        currentIndex
      })

      // 2.将最新的currentIndex传递分类页面，将组件里的某个状态传到分类页面中
      this.triggerEvent("menuclick",{currentIndex},{})
    }
  }
})
