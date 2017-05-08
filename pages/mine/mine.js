// pages/mine/mine.js
// 格式化首页图片路径
var formatImagePath = function (arr) {
  var pathArr = []
  for (let i = 0; i < arr.length; i++) {
    wx.request({
      url: 'http://127.0.0.1:3000/match/find',
      data: {_id: arr[i].matchId},
      method: 'GET',
      success: function (res) {
          var path = res.data.indexImg;
          var index = path.indexOf('\\');
          path = path.slice(index + 1,path.length);
          pathArr.push(path);
      }
    })
  }
  return pathArr;
}
Page({
  data: {
    username: '',
    orders: [],
    pathArr: []
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
        // 根据用户id查询orders表
        wx.request({
          url: 'http://127.0.0.1:3000/orders/find',
          data: { userId: res.data },
          success: (res) => {
            var orders = res.data
            var pathArr = formatImagePath(orders);
            console.log('pathArr',pathArr) // 这里打印很奇怪
            this.setData({
              orders: orders,
              pathArr: pathArr
            })
            console.log('XXX',this.data)
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
      wx.reLaunch({
        url: '/pages/login/login'
      })
    } catch (e) {
      // Do something when catch error
    }
  }
})