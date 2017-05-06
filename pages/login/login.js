// pages/login/login.js
Page({
  data: {
    isShowError: false,
    errorInfo: '',
    accVal: '',
    pwdVal: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  // 失去焦点检测用户名是否存在
  inputEvent: function (e) {
    wx.request({
      url: 'http://127.0.0.1:3000/users/find',
      data: { acc: e.detail.value, findType: 'exact' },
      method: 'GET',
      success: function (res) {
        if (res.data.length < 1) {
          // 不存在用户
          this.setData({
            isShowError: true,
            errorInfo: '没有该用户'
          })
        } else {
          this.setData({
            isShowError: false,
            errorInfo: '',
            accVal: e.detail.value
          })
        }
      }.bind(this)
    })
  },
  // 失焦获取密码的值
  passBlurEvent: function (e) {
    this.setData({
      pwdVal: e.detail.value
    })
  },
  // 登陆事件
  loginEvent: function () {
    if (this.data.errorInfo == '没有该用户') {
      return;
    }
    wx.request({
      url: 'http://127.0.0.1:3000/users/find',
      data: { acc: this.data.accVal, pwd: this.data.pwdVal, findType: 'exact' },
      method: 'GET',
      success: function (res) {
        if (res.data.length > 0) {
          this.setData({
            isShowError: false,
          })
          var userId = res.data[0]._id;
          // 登陆成功
          wx.switchTab({
            url: '/pages/index/index',
            success: function(res){
               try {
                wx.setStorageSync('user', userId)
              } catch (e) {
              }
            }
          })
        } else {
          this.setData({
            isShowError: true,
            errorInfo: '密码错误，请重新输入.'
          })
        }
      }.bind(this)
    })
  },
  regEvent: function () {
    wx.navigateTo({
      url: '../reg/phone/phone'
    })
  }
})