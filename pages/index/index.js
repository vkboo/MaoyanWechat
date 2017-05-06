var app = getApp();
Page({
  data: {
    imgUrls: [
      "../images/banner1.png",
      "../images/banner2.png",
      "../images/banner3.png"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    filmsData: [] // 页面的电影数据
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
    this.getData();
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
  // 进入页面后加载得到所有数据
  getData: function () {
    wx.request({
      url: 'http://127.0.0.1:3000/hot/find',
      data: {},
      method: 'POST',
      success: function (res) {
        // 图片文件路径的转换
        var data = app.formatImgPath(res.data);
        this.setData({
          filmsData: data
        })
      }.bind(this)
    })
  },
  // 点击进入电影详情
  goDetailEvent(e) {
    var filmId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${filmId}`
    })
  },
  // 点击“购票”选择影院
  goCinemaEvent(e) {
    // hot中的图片名（因为match中没有与hot中电影的id相关联，所以只能用首页图片名保证唯一性），对应match表中的key
    var hotIndexImg = e.currentTarget.dataset.id;
    console.log('hotIndexImg', hotIndexImg)
    var matchId = '';
    wx.request({
      url: 'http://127.0.0.1:3000/match/find',
      data: { indexImg: hotIndexImg },
      method: 'GET',
      success: function (res) {
        matchId = res.data[0]._id;
        // 跳转要传递match表中元素的id
        wx.navigateTo({
          url: `/pages/cinemasbuy/cinemasbuy?id=${matchId}`
        })
      }
    })


  }
})