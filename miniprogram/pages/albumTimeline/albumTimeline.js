// 第三页：避免在 onLoad 同步引入大模块并批量 getImageInfo，防止真机白屏；
// 预加载已移除，第四页依赖 getTempFileURL 即可。
Page({
  data: {},

  onPhoto2015Tap() {
    wx.navigateTo({ url: '/pages/album2015/album2015' });
  },

  onPhoto2016Tap() {
    wx.navigateTo({ url: '/pages/album2016/album2016' });
  },

  onPhoto2017Tap() {
    wx.navigateTo({ url: '/pages/album2017/album2017' });
  },

  onPhoto2018Tap() {
    wx.navigateTo({ url: '/pages/album2018/album2018' });
  },

  onPhoto2019Tap() {
    wx.navigateTo({ url: '/pages/album2019/album2019' });
  },

  onBackTap() {
    wx.navigateBack({ delta: 1 });
  },
});
