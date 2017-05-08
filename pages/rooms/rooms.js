var app = getApp();
var matchIdAndIndex;
// 格式化首页图片路径
var formatIndexImgPath = function (path) {
  let index = path.indexOf('\\');
  let newPath = path.slice(index + 1, path.lenth);
  return newPath;
}
Page({
  data: {
    film: {},
    cinema: {},
    rooms: [],
    indexImg: ''
  },
  onLoad: function (options) {
    matchIdAndIndex = {
      id: options.id,
      cinemaIndex: options.index // 院线在其中的索引
    }
    this.getData(options.id,options.index);
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
  // 获取全部数据
  getData: function (id,index) {
    wx.request({
      url: 'http://127.0.0.1:3000/match/find',
      data: { _id: id },
      method: 'GET',
      success: (res) => {
        var data = res.data;
        var indexImg = formatIndexImgPath(data.indexImg)
        this.setData({
          film: data,
          cinema: data.cinemas[index].cinema,
          rooms: data.cinemas[index].rooms,
          indexImg: indexImg
        })
      },
    })
  },
  // 选座购票
  chooseSeat: function(e) {
    var roomIndex = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/seats/seats?id=${matchIdAndIndex.id}&cinemaIndex=${matchIdAndIndex.cinemaIndex}&roomIndex=${roomIndex}`
    })
  }

})