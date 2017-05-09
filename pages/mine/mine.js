// pages/mine/mine.js
var orders = []; // 所有订单
// 从match中更新数组所需要的数据
var g_cinemaIndexArr;
var g_roomIndexArr;
var xArr;
var yArr;

var g_seatsCodeArr = []; // 代码中本订单的数组的数组
var joinSeatArr = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    g_seatsCodeArr.push(arr[i].seatsCode);
  }
}

var formatImgPath = function (arr) {
  var imgPathArr = [];
  for (let i = 0; i < arr.length; i++) {
    var path = arr[i].indexImgPath;
    var index = path.indexOf('\\');
    var newPath = path.slice(index + 1, path.length);
    imgPathArr.push(newPath);
  }
  return imgPathArr;
}

Page({
  data: {
    username: '',
    orders: [],
    imgPaths: []
  },
  onLoad: function (options) {
    this.getData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getData();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    orders = [];
    g_cinemaIndexArr = [];
    g_roomIndexArr = [];
    xArr = [];
    yArr = [];
  },
  getData: function () {
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
            orders = res.data;
            var imgPaths = formatImgPath(orders);
            joinSeatArr(orders); // 将seat加入一个数组中
            this.setData({
              orders: orders,
              imgPaths: imgPaths
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
  },
  // 取消订单
  cancelEvent: function (e) {
    // 删除orders表中的数据
    let matchId = e.currentTarget.dataset.matchid;
    let orderid = e.currentTarget.dataset.orderid;
    let index = e.currentTarget.dataset.index;
    wx.request({
      url: 'http://127.0.0.1:3000/orders/del',
      data: { _id: orderid },
      method: 'POST',
      success: (res) => {
        // 更新列表显示
        orders.splice(index, 1);
        this.setData({
          orders: orders
        })
      }
    })
    var x = e.currentTarget.dataset.x;
    var y = e.currentTarget.dataset.y;
    var cinemaIndex = e.currentTarget.dataset.cinemaindex;
    var roomIndex = e.currentTarget.dataset.roomindex;
    // 整合新数组

    // 更新match表中的房间数组
    console.log(x, y, cinemaIndex, roomIndex)
    wx.request({
      url: 'http://127.0.0.1:3000/match/find',
      data: { _id: matchId },
      success: function (res) {
        var seatAry = g_seatsCodeArr[index]
        for (let i = 0; i < seatAry.length; i++) {
          for (let j = 0; j < seatAry[i].length; j++) {
            if (seatAry[i][j] == 2) {
              seatAry[i][j] = 1;
            }
          }
        }
        var cinemas = res.data.cinemas;
        cinemas[cinemaIndex].rooms[roomIndex].seat = JSON.stringify(seatAry);

        wx.request({
          url: 'http://127.0.0.1:3000/match/update',
          data: { _id: matchId, cinemas: cinemas },
          method: 'GET',
          success: function (res) {
            console.log('match中的数组更新成功')
          }
        })
      }
    })
  }
})