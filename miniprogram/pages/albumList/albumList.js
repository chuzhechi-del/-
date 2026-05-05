// 相册列表：从云数据库读取，多设备同步
const db = wx.cloud.database();

Page({
  data: {
    albums: [],
    loading: true,
  },

  onLoad() {},
  onShow() {
    this._loadAlbums();
  },

  async _loadAlbums() {
    this.setData({ loading: true });
    try {
      const res = await db.collection('albums').orderBy('createTime', 'desc').get();
      this.setData({ albums: res.data || [], loading: false });
    } catch (err) {
      console.error(err);
      this.setData({ albums: [], loading: false });
      wx.showToast({ title: '加载失败，请检查云数据库', icon: 'none' });
    }
  },

  toNewAlbum() {
    wx.navigateTo({ url: '/pages/albumEdit/albumEdit' });
  },
  toDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/albumDetail/albumDetail?id=${id}` });
  },
});
