//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  formatImgPath: function (receive) {
    var data = [];
    if (receive instanceof Array) {
      // receive是数组
      data = receive;
    } else {
      // receive是对象
      data.push(receive)
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].indexImg.length > 0) {
        var indexImgPath = data[i].indexImg[0];
        var index = indexImgPath.indexOf('\\');
        data[i].indexImg[0] = indexImgPath.slice(index + 1, indexImgPath.length);
      }
      if (data[i].directorImg.length > 0) {
        for (let m = 0; m < data[i].directorImg.length; m++) {
          var directorImgPath = data[i].directorImg[m];
          var index = directorImgPath.indexOf('\\');
          data[i].directorImg[m] = directorImgPath.slice(index + 1, directorImgPath.length);
        }
      }
      if (data[i].actorsImg.length > 0) {
        for (let m = 0; m < data[i].actorsImg.length; m++) {
          var actorsImgPath = data[i].actorsImg[m];
          var index = actorsImgPath.indexOf('\\');
          data[i].actorsImg[m] = actorsImgPath.slice(index + 1, actorsImgPath.length);
        }
      }

      if (data[i].filmImg.length > 0) {
        for (let m = 0; m < data[i].filmImg.length; m++) {
          var filmImgPath = data[i].filmImg[m];
          var index = filmImgPath.indexOf('\\');
          data[i].filmImg[m] = filmImgPath.slice(index + 1, filmImgPath.length);
        }
      }

    }
    return data;
  }
})