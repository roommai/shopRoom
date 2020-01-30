import request from './network.js'

export function getCategory(){
  return request({
    url:'/category'
  })
}
export function getSubcategory(maitKey){
  return request({
    url: '/subcategory',
    data:{
      maitKey
    }
  })
}

//获取分类详情数据请求
export function getCategoryDetail(miniWallkey,type){
  return request({
    url: '/subcategory/detail',
    data:{
      miniWallkey,
      type
    }
  })
}