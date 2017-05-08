// pages/modifypwd/modifypwd.js
var newPwdVal = '';
Page({
  data: {
    user: {},
    isShowError: false,
    errorInfo: '',
    prePwd: '',
    newPwd: '',
    isBtnVisibel: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
      key: 'user',
      success: (res) => {
        wx.request({
          url: 'http://127.0.0.1:3000/users/find',
          data: { _id: res.data },
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
    console.log('得到当前用户对象', this.data.user)
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
  // 获取原密码
  blurPrePwd: function (e) {
    console.log(e.detail.value)
    if (this.data.user.pwd == e.detail.value) {
      this.setData({
        isShowError: false,
      })
    } else {
      this.setData({
        isShowError: true,
        errorInfo: '原密码不正确',
        isBtnVisibel: true
      })
    }
  },
  // 获取新秘密
  blurNewPwd: function (e) {
    newPwdVal = e.detail.value;
  },
  // 获取确认密码
  surePwd: function (e) {
    if (newPwdVal == e.detail.value) {
      this.setData({
        isBtnVisibel: false,
        isShowError: false
      })
    } else {
      this.setData({
        isBtnVisibel: true,
        isShowError: true,
        errorInfo: '两次密码不一致'
      })
    }
  },
  // 提交
  modifyPwdBtn: function () {
    let userId = this.data.user._id;
    wx.request({
      url: 'http://127.0.0.1:3000/users/update',
      data: { _id: userId, pwd: newPwdVal },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: "密码修改成功",
          icon: 'success',
          duration: 2000
        });
      }
    })
  }
})