// app.js - 云开发初始化（云存储 / 云数据库）
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'timeabulm-5gi8yiop0ed0acf9',
        traceUser: true,
      });
    }

    this.globalData = {};
  },
});
