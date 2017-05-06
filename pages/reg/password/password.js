// pages/password/password.js
Page({
  data: {
    item: {
      btnVal: '确定注册',
      isShowDeal: false,
      showError: false,
      errorInfo: '',
      btnDisable: true, // 按钮是否不可用
      isPwd: true,
      rows: [
        {
          labelVal: '密码:',
          placeHolderVal: '请输入密码'
        }, {
          labelVal: '确认密码:',
          placeHolderVal: '请确认密码'
        }
      ]
    },
    accVal: '', // 手机号(从第一张页面传过来)
    pwdVal: ''
  },
  onLoad: function (options) {
    this.setData({
      accVal: options.acc
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
  // 正则密码验证
  blurEvent: function (e) {
    // 正则验证
    if (e.currentTarget.dataset.diyid == 0) {
      var showError = false;
      var showError = false;
      var errorInfo = '';
      var btnDisable = true;

      if (/^[0-9a-zA-Z]{4,12}$/.test(e.detail.value)) {
        // 正则验证成功
        showError = false;
        this.setData({
          pwdVal: e.detail.value
        })
      } else {
        // 正则验证失败
        showError = true;
        errorInfo = '请输入4-12位密码(不含特殊字符)';
        btnDisable = true;
      }

      this.setData({
        item: {
          btnVal: '确定',
          isShowDeal: false,
          showError: showError, // 是否显示验证错误信息
          errorInfo: errorInfo, // 验证错误信息
          btnDisable: btnDisable,
          isPwd: true,
          rows: [
            {
              labelVal: '密码:',
              placeHolderVal: '请输入密码'
            }, {
              labelVal: '确认密码:',
              placeHolderVal: '请确认密码'
            }
          ]
        }
      })
    }

    // 密码重复验证
    if (e.currentTarget.dataset.diyid == 1) {
      var pwdVal = this.data.pwdVal;
      if (pwdVal == e.detail.value) {
        // 确认密码true
        btnDisable = false
      } else {
        showError = true,
          errorInfo = '两次密码不一致',
          btnDisable = true
      }
    }

    this.setData({
      item: {
        btnVal: '确定注册',
        isShowDeal: false,
        showError: showError, // 是否显示验证错误信息
        errorInfo: errorInfo, // 验证错误信息
        btnDisable: btnDisable,
        isPwd: true,
        rows: [
        {
          labelVal: '密码:',
          placeHolderVal: '请输入密码'
        }, {
          labelVal: '确认密码:',
          placeHolderVal: '请确认密码'
        }
      ]
      }
    })

  },
  // 提交
  next: function () {
    var accVal = this.data.accVal;
    var pwdVal = this.data.pwdVal;
    wx.request({
      url: 'http://127.0.0.1:3000/users/add',
      data: {
        acc: accVal,
        pwd: pwdVal
      },
      method: 'GET',
      success: function (res) {
        wx.showToast({
          title: "注册成功",
          icon: 'success',
          duration: 2000
        });
        setTimeout(function(){
            wx.navigateTo({
              url: '../../login/login'
            })
        },1500)
      }
    })
  }
})