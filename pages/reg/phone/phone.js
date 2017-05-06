// pages/phone/phone.js
Page({
  data: {
    item: {
      // 模板数据

      btnVal: '获取验证码',
      isShowDeal: true,
      showError: false, // 是否显示验证错误信息
      errorInfo: '', // 验证错误信息
      btnDisable: true,
      rows: [
        {
          labelVal: '手机号:',
          placeHolderVal: '请输入手机号'
        }
      ]
    },

    acc: '',

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
  // methods 
  next: function () {
    wx.navigateTo({
      url: `../code/code?acc=${this.data.acc}`,
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
    var errorInfo = '';
    var btnDisable = true;
    // 正则验证
    if (/^\d{11}$/.test(e.detail.value)) {
      // 正则验证成功
      this.setData({
        acc: e.detail.value
      });
      showError = false,
        // 验证成功后加入到数据库
        wx.request({
          url: 'http://127.0.0.1:3000/users/find',
          data: { acc: e.detail.value },
          method: 'GET',
          success: function (res) {
            console.log('res', res.data)
            if (res.data.length > 0) {
              showError = true;
              errorInfo = '重名';
            } else {
              showError = false,
                btnDisable = false
            }
            this.setData({
              item: {
                btnVal: '获取验证码',
                isShowDeal: true,
                showError: showError, // 是否显示验证错误信息
                errorInfo: errorInfo, // 验证错误信息
                btnDisable: btnDisable,
                rows: [
                  {
                    labelVal: '手机号:',
                    placeHolderVal: '请输入手机号'
                  }
                ]
              }
            })
          }.bind(this)
        })
    } else {
      // 正则验证失败
      showError = true,
        errorInfo = '手机号格式不正确'
    }


    this.setData({
      item: {
        btnVal: '获取验证码',
        isShowDeal: true,
        showError: showError, // 是否显示验证错误信息
        errorInfo: errorInfo, // 验证错误信息
        btnDisable: btnDisable,
        rows: [
          {
            labelVal: '手机号:',
            placeHolderVal: '请输入手机号'
          }
        ]
      }
    })

  }
})