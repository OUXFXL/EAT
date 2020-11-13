//引入用来发送请求的方法
import{request}from '../../request/index.js'
Page({
  data:{
    //左侧菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightConent:[],
    //被点击左侧的菜单
    currentIndex:0,
    //右侧内容的滚动条距离顶部的距离
    scrollTop:0
  },
  //接口的返回数据
  Cates:[],
  onLoad: function (params) {
    //调用分类数据函数
  
    /*
    1.先判断本地存储中有没有旧的数据
    2.没有旧数据 直接发送新请求
    3.有旧的数据 同时 旧的数据也没有过期 就使用本地旧的数据即可
    */
   //1，获取本地存储中的数据（小程序中也是存在本地存储技术）
   const Cates = wx.getStorageSync('cates');
   //2.判断
   if(!Cates){
//发送请求获取数据
this.getCates();
   }else{
     //有旧的数据 定义过期时间
     if(Date.now()-Cates.time>1000*10){
       //重新发送请求
       this.getCates();
     }else{
       //可以使用旧的数据
      //  console.log("可以使用旧的数据")
      this.Cates=Cates.data;
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      //构造右侧的商品数据
      let rightConent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightConent
      })

     }
   }
  },
  //获取分类数据
  getCates(){
    request({
      url:"/categories"
     
    }).then(res=>{
      this.Cates=res.data.message;
 //把接口的数据存入本地存储中
 wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
      //构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      //构造右侧的商品数据
      let rightConent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightConent
      })
    })
  },
  //做菜单的点击事件
  handleItemTap(e){
    // 获取被点击的标题身上的索引
    //给data中的currentIndex赋值就可以了 根据不同的索引来渲染 右侧的商品内容
    // console.log(e)
    const {index}=e.currentTarget.dataset;
    let rightConent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightConent,
      //重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop:0

    })

  }
  
})