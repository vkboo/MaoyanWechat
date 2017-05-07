// pages/cinemas/cinemas.js
Page({
  data:{
    data: [] // 电影院数组
  },
  onLoad:function(options){
    // 获取本页的全部数据
    this.getData();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
   // 获取本页的全部数据
   getData: function() {
     wx.request({
       url: 'http://127.0.0.1:3000/cinemas/find',
       data: {},
       method: 'GET', 
       success: (res) => {
         console.log('origin',res.data)
          this.setData({
            data: res.data
          })
          console.log(this.data.data)
       }
     })
   }
})