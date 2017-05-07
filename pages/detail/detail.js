// pages/detail/detail.js
var app = getApp();
Page({
  data: {
    filmName: '',
    filmEname: '',
    grade: '',
    type: '',
    area: '',
    time: '',
    release: '',
    upArea: '',
    desc: '',
    actorsName: '',
    boxoffice: '',
    indexImg: [],
    directorImg: [],
    actorsImg: [],
    filmImg: [],
    directorName: '',
    actorsName: []
  },
  onLoad: function (options) {
    this.getData(options.id);
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
  // 得到本页需要的全部数据
  getData: function (id) {
    wx.request({
      url: 'http://127.0.0.1:3000/hot/find',
      data: { _id: id },
      method: 'GET',
      success: (res) => {
        var dataArr = app.formatImgPath(res.data);
        var data = dataArr[0];
        var actorsName = data.actors.split('|');
        this.setData({
          filmName: data.name,
          filmEname: data.eName,
          grade: data.grade,
          type: data.type,
          area: data.area,
          time: data.time,
          release: data.release,
          upArea: data.upArea,
          desc: data.desc,
          actorsName: data.actors,
          boxoffice: data.money,
          indexImg: data.indexImg,
          directorImg: data.directorImg,
          actorsImg: data.actorsImg,
          filmImg: data.filmImg,
          directorName: data.director,
          actorsName: actorsName
        })
      }
    })
  },
  // 点击立即购票
  buyEvent: function(e) {
    // 由于数据库设计问题，为了保证唯一性，只能通过首页图片名字找出match表中对应的数据
    // 得到图片path之后，再到match表中查询对应的那一条数据的_id.
    var indexImagePath = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://127.0.0.1:3000/match/find',
      data: {indexImg: indexImagePath},
      method: 'GET', 
      success: function(res){
        let matchId = res.data[0]._id;
        wx.navigateTo({
          url: `/pages/cinemasbuy/cinemasbuy?id=${matchId}`
        })
      }
    })

  }
})