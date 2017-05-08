// pages/mine/mine.js
Page({
  data: {
    username: ''
  },
  onLoad: function (options) {
    // 取得用户_id
    wx.getStorage({
      key: 'user',
      success: (res) => {
        wx.request({
          url: 'http://127.0.0.1:3000/users/find',
          data: { _id: res.data },
          success: (res) => {
            this.setData({
              username: res.data.acc
            })
          }
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // 进入修改密码页
  modifyPwd: function () {
    wx.navigateTo({
      url: '/pages/modifypwd/modifypwd'
    })
  },
  // 退出登录
  logout: function () {
    try {
      wx.removeStorageSync('user');
      wx.navigateTo({
          url: '/pages/login/login'
        })
    } catch (e) {
      // Do something when catch error
    }
  }
})