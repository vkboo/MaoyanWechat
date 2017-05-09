// pages/seats/seats.js
var seatArr = [];
var priceUnit = 0; // 单价
var priceTotal = 0; // 总价
var matchId = '';
var seatInfo; // 现场座位信息
var seatsArrCode; // 代码中的座位二位数组
var innerIndex; // 内层索引
var outterIndex; // 外层索引
var g_indexImgPath; // 首页图片，传到“我的”使用


var g_cinemasNow; // 当前修改的match中的cinemas字段数据，用于后面更新
var g_cinemaIndex;
var g_roomIndex;
var g_rowArr = [];
var g_colArr = [];
Page({
  data: {
    filmName: '',
    cinemaName: '',
    roomName: '',
    playTime: '',
    price: '',
    seatsArr: [],
    seatDirection: ['请点击选座'],
    btnString: '请先选座',
    btnSty: '#f5ddb1',  //  E1102E
    isBtnDisable: true
  },
  onLoad: function (options) {
    // var options = {
    //   id: '590c237beeab3e1114c8a29b',
    //   cinemaIndex: '1',
    //   roomIndex: '1'
    // }
    // 将options中的字符串数组改成数字
    console.log('seats接受的数据', options)
    var cinemaIndex = Number(options.cinemaIndex);
    var roomIndex = Number(options.roomIndex);
    g_cinemaIndex = cinemaIndex;
    g_roomIndex = roomIndex;
    this.getData(options.id, cinemaIndex, roomIndex);
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
  // 得到当前页所需的在match表中的数据,并渲染
  getData: function (id, cinemaIndex, roomIndex) {
    matchId = id;
    wx.request({
      url: 'http://127.0.0.1:3000/match/find',
      data: { _id: id },
      method: 'POST',
      success: (res) => {
        var match = res.data;
        g_indexImgPath = match.indexImg;
        this.setData({
          filmName: match.name,
          cinemaName: match.cinemas[cinemaIndex].cinema.name,
          roomName: match.cinemas[cinemaIndex].rooms[roomIndex].room,
          playTime: match.cinemas[cinemaIndex].rooms[roomIndex].time,
          price: 0,
          seatsArr: JSON.parse(match.cinemas[cinemaIndex].rooms[roomIndex].seat)
        })
        priceUnit = Number(match.cinemas[cinemaIndex].rooms[roomIndex].price);
        g_cinemasNow = match.cinemas;
      }
    })

  },
  // 点击座位
  chooseSeat: function (e) {
    // 座位标识（可选或已选）
    var flag = e.currentTarget.dataset.flag;
    // 二位数组索引(里层)
    innerIndex = e.currentTarget.dataset.innerindex;
    // 二位数组索引(外层)
    outterIndex = e.currentTarget.dataset.outterindex;
    if (flag == 1) {
      // 最多只能买3张票
      if (seatArr.length == 5) {
        return;
      }
      // 点击选座
      var seatsArr = this.data.seatsArr;
      seatsArr[outterIndex][innerIndex] = 2;
    } else if (flag == 2) {
      // 点击取消选座)
      var seatsArr = this.data.seatsArr;
      seatsArr[outterIndex][innerIndex] = 1;
    }
    this.setData({
      seatsArr: seatsArr
    })
    // 获取现场座位号
    var row = 0, col = 0;
    for (let i = 0; i < outterIndex; i++) {
      if (Number(seatsArr[i].join('')) != 0) {
        // 非空行
        row++
      }
    }

    var selectedRow = seatsArr[outterIndex];
    for (let j = 0; j < innerIndex; j++) {
      if (selectedRow[j] != 0) {
        col++
      }
    }

    g_rowArr.push(outterIndex);
    g_colArr.push(innerIndex);

    seatInfo = `${row + 1}排${col + 1}座`;
    // 判断选座还是取消选座，移除显示
    var seatIndex = seatArr.indexOf(seatInfo);
    if (seatIndex != -1) {
      priceTotal = priceTotal - priceUnit;
      seatArr.splice(seatIndex, 1);
    } else {
      priceTotal = priceTotal + priceUnit;
      seatArr.push(seatInfo)
    }

    // 判断有无选择座位，改变按钮显示文字
    if (seatArr.length == 0) {
      // 无
      var btnString = '请先选座';
      var btnSty = '#f5ddb1';
      var isBtnDisable = true
    } else {
      btnString = `立即购买(${seatArr.length}张)`;
      btnSty = '#E1102E';
      isBtnDisable = false
    }

    this.setData({
      seatDirection: seatArr,
      btnString: btnString,
      btnSty: btnSty,
      isBtnDisable: isBtnDisable,
      price: priceTotal
    })

    seatsArrCode = seatsArr;
  },
  // 点击购票
  // 1. 更新match表的二维数组；
  // 2. 加入orders表，生成新的订单
  buyEvent: function () {
    // 整合cinemas数据
    console.log(g_cinemasNow, g_cinemaIndex, g_roomIndex)
    console.log(g_rowArr, g_colArr)
    var newSeat = JSON.parse(g_cinemasNow[g_cinemaIndex].rooms[g_roomIndex].seat);
    for (let i = 0; i < g_rowArr.length; i++) {
      newSeat[g_rowArr[i]][g_colArr[i]] = 3
    }
    g_cinemasNow[g_cinemaIndex].rooms[g_roomIndex].seat = JSON.stringify(newSeat);
    console.log('整合后', g_cinemasNow);
    wx.getStorage({
      key: 'user',
      success: (res) => {

        // 更新match表
        wx.request({
          url: 'http://127.0.0.1:3000/match/update',
          data: {
            _id: matchId,
            cinemas: g_cinemasNow
          },
          method: 'GET',
          success: function (res) {
            console.log('座位在match表中更新成功');
          }
        })
        // 整合订单数据
        var order = {
          matchId: matchId, // 用于“取消订单”时更新match数据
          name: this.data.filmName,
          cinemas: this.data.cinemaName,
          roomName: this.data.roomName,
          time: this.data.playTime,
          price: this.data.price,
          userId: res.data,
          seats: seatArr, // 现场座位信息
          seatsCode: seatsArrCode, // 代码中的座位数组
          cinemaIndex: g_cinemaIndex,
          roomIndex: g_roomIndex,
          x: outterIndex,
          y: innerIndex,
          indexImgPath: g_indexImgPath
        }
        wx.request({
          url: 'http://127.0.0.1:3000/orders/add',
          data: order,
          method: 'POST',
          success: function (res) {
            wx.showToast({
              title: "购买成功，您可以去“我的”查看您的订单",
              icon: 'success',
              duration: 2000
            });
            setTimeout(function () {
              wx.reLaunch({
                url: 'pages/index/index'
              })
            }, 1500)
          }
        })
      }
    })
  }
})