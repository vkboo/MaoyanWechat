// pages/modifypwd/modifypwd.js
Page({
  data: {
    user: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
      key: 'user',
      success: (res) => {
        wx.request({
          url: 'http://127.0.0.1:3000/users/find',
          data: {_id: res.data},
          success: (res) => {
            this.setData({
              user: res.data
            })
          }
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
    console.log('得到当前用户对象',this.data.user)
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})