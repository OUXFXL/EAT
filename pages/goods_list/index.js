/**
 * 1.用户上滑页面 滚动条触底 开始加载下一页数据
 * 2.找到滚动条触底事件
 * 3.判断还有没有下一也数据
 *   1.判断还有没有下一页数据
 * 获取到总页数 只有总条数
 * 总页数=Math.ceil(总条数/页容量)
 * Math.ceil(23/10)=3
 *   2.获取到当前的页码
 * 3.只要判断当前的页码是否大于等于总页数 表示没有下一页数据
 * 4.假如没有下一页数据 弹出一个提示
 * 5.假如还有下一页数据 来加载下一页数据
 * 1.当前页码++
 * 2.重新发送请求
 * 3.数据请求回来了 要对data中的数组拼接 而不是全部替换
 */
import{request}from '../../request/index.js'
Page({
  data: {
tabs:[
  {
    id:0,
value:'综合',
isActive:true
  },
  {
    id:1,
value:'销量',
isActive:false
  },
  {
    id:2,
value:'价格',
isActive:false
  }
],
goodsList:[],
  },
//接口要的参数
QueryParams:{
query:"",
cid:"",
pagenum:1,
pageSize:10
},
//总页数
totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// console.log(options)
this.QueryParams.cid=options.cid;
this.getGoodsList()
 //页面加载


  },
 
  //获取商品列表数据
 async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    console.log(res)
    //获取总条数
    const total=res.data.message.total;
    //计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pageSize)
    // console.log(this.totalPages)
    this.setData({
      // res.data.message.goods
      //拼接 数组
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })
  },
  
//标题点击事件 从子组件传递过来的
handleTabsItemChange(e){
  // console.log(e)
  //1.获取被点击标题的索引
  const {index}=e.detail;
  //2.修改原数组
  let {tabs}=this.data;
  tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
  //3.赋值到data中
  this.setData({
    tabs
  })
},
//页面上滑 滚动条触底事件
onReachBottom(){
  // console.log('页面触底');
  if(this.QueryParams.pagenum>=this.totalPages){
    //没有下一页数据了
    // console.log("没有下一页数据了")
    wx.showToast({
      title: '没有下一页数据了',
     
    })

  }else{
    //还有下一页数据
    // console.log("还有下一页数据")
    this.QueryParams.pagenum++;
    this.getGoodsList();
  }
}
})