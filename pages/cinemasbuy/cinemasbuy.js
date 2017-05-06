// pages/cinemasbuy/cinemasbuy.js
Page({
  data: {
    data: []
  },
  onLoad: function (options) {
    // var options = {id: '590980e2063bc93dfc104b3d'}
    this.getData(options.id);
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
  // 加载全部数据
  getData: function (id) {
    wx.request({
      url: 'http://127.0.0.1:3000/match/find',
      data: { _id: id },
      method: 'GET',
      success: (res) => {
        var match = res.data;
        this.setData({
          data: match
        })
      }
    })
  },
  // 点击进入放映厅
  clickEvent: function (e) {
    // match表数据的_id
    let matchId = e.currentTarget.dataset.id;
    // 当前点击的第几个电影院，将索引传给rooms组件，以便取出对应的影院与放映厅
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/rooms/rooms?id=${matchId}&index=${index}`
    })
  }

})