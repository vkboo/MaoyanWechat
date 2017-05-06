// pages/code/code.js
Page({
  data: {
    item: {
      btnVal: '确定',
      isShowDeal: false,
      showError: false,
      errorInfo: '',
      btnDisable: true, // 按钮是否不可用
      rows: [
        {
          labelVal: '验证码:',
          placeHolderVal: '请输入验证码'
        }
      ]
    },
    acc: ''

  },
  onLoad: function (options) {
    this.setData({
      acc: options.acc
    })
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
  next: function () {
    wx.navigateTo({
      url: `../password/password?acc=${this.data.acc}`,
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  blurEvent: function (e) {
    var showError = false;
    var btnDisable = true;
    var errorInfo = '';
    if (/^\d{4}$/.test(e.detail.value)) {
      // 模拟四位数字，则验证成功
      showError = false;
      btnDisable = false;
    } else {
      // 验证失败
      showError = true;
      errorInfo = '验证码格式不对';
      btnDisable = true;
    }

    this.setData({
      item: {
        btnVal: '确定',
        isShowDeal: false,
        showError: showError, // 是否显示验证错误信息
        errorInfo: errorInfo, // 验证错误信息
        btnDisable: btnDisable,
        rows: [
          {
            labelVal: '验证码:',
            placeHolderVal: '请输入验证码'
          }
        ]
      }
    })

    console.log(this.data.item)
  }
})