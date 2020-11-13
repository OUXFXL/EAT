// pages/goods_detail/index.js
//发送数据获取请求
import{request}from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
goodsObj:{}
  },
  //商品对象
  GoodsInfo:{},
  onLoad: function (options) {
    const {goods_id}=options;
    console.log(options)
    this.getGoodsDetail(goods_id)
  },
//获取商品数据详情
async getGoodsDetail(goods_id){

  const goodsObj=await request({url:'/goods/detail',data:{goods_id}});
  this.GoodsInfo=goodsObj;
 this.setData({
  goodsObj
  
 })
},

 //点击轮播图 放大预览
 handlePrevewImg(e){
   const urls=this.GoodsInfo.data.message.pics.map(v=>v.pics_mid)
   //接收床递过来的url
   console.log(urls)
   const current=e.currentTarget.dataset.urls
  //  console.log("预览","++++=")
  wx.previewImage({
    urls,
    current,
  })
 }

})