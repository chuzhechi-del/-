// 相册详情：从云数据库读取单条，照片从云存储取临时链接展示
const db = wx.cloud.database();

Page({
  data: {
    album: null,
    photoUrls: [],
    loading: true,
  },

  async onLoad(options) {
    const id = options.id;
    if (!id) {
      wx.showToast({ title: '相册不存在', icon: 'none' });
      return;
    }
    try {
      const res = await db.collection('albums').doc(id).get();
      const album = res.data;
      if (!album) {
        wx.showToast({ title: '相册不存在', icon: 'none' });
        return;
      }
      this.setData({ album });
      this._loadPhotoUrls(album.photoFileIds || []);
    } catch (err) {
      console.error(err);
      this.setData({ loading: false });
      wx.showToast({ title: '加载失败，请检查云数据库', icon: 'none' });
    }
  },

  async _loadPhotoUrls(fileIds) {
    if (!fileIds.length) {
      this.setData({ loading: false });
      return;
    }
    try {
      const res = await wx.cloud.getTempFileURL({ fileList: fileIds });
      const photoUrls = (res.fileList || []).map(f => f.tempFileURL || f.fileID);
      this.setData({ photoUrls, loading: false });
    } catch (err) {
      console.error(err);
      this.setData({ loading: false });
      wx.showToast({ title: '照片加载失败', icon: 'none' });
    }
  },
});
