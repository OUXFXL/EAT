//index.js
//引入用来发送请求的方法
import{request}from '../../request/index.js'
//获取应用实例
const app = getApp()

Page({
 data:{
   //轮播图数组
   swipperList:[],
   //导航数组
   catesList:[],
   //楼层数组
   floorList:[],
 },
 //页面开始加载，就会触发
 onLoad:function(option){
   //发送异步请求 获取轮播图数据 优化的手段可以通过es6的promise来解决这个问题
  //  wx.request({
  //    url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
  //    success:(res)=>{
  //   this.setData({
  //     swipperList:res.data.message
  //   })
  //    }
  //  })
  //调用轮播图数据方法
this.getswipperList(),
//调用导航数据方法
this.getcatesList(),
//调用楼层数据方法
this.getfloorList()
 },
 //获取轮播图数据
 getswipperList(){
  request({url:"/home/swiperdata"}).then(res=>{
    this.setData({
          swipperList:res.data.message
        })
  })
 },
//获取导航数据
getcatesList(){
  request({url:"/home/catitems"}).then(res=>{
    this.setData({
      catesList:res.data.message
        })
  })
 },
//获取楼层数据
getfloorList(){
  request({url:"/home/floordata"}).then(res=>{
    this.setData({
      floorList:res.data.message
        })
  })
 },
})
