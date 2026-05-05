// 创建相册：界面与参考图一致；照片传云存储，相册名/拍摄日期存云数据库
const db = wx.cloud.database();

Page({
  data: {
    statusBarHeight: 20,
    albumDate: '',
    dateDisplay: '2026/3/4',
    albumName: '',
    photos: [],
    uploading: false,
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    const d = new Date();
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    this.setData({
      statusBarHeight: sys.statusBarHeight || 20,
      albumDate: dateStr,
      dateDisplay: this._toDisplayDate(dateStr),
    });
  },

  onBack() {
    wx.navigateBack({ delta: 1 });
  },

  _toDisplayDate(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${y}/${Number(m)}/${Number(d)}`;
  },

  onDateChange(e) {
    const v = e.detail.value;
    this.setData({
      albumDate: v,
      dateDisplay: this._toDisplayDate(v),
    });
  },

  onAlbumNameInput(e) {
    this.setData({ albumName: (e.detail.value || '').trim() });
  },

  choosePhotos() {
    wx.chooseMedia({
      count: 9 - this.data.photos.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      success: (res) => {
        const newPaths = (res.tempFiles || []).map(f => f.tempFilePath);
        const photos = this.data.photos.concat(newPaths.map(p => ({ tempFilePath: p, fileID: '' })));
        this.setData({ photos });
      },
    });
  },

  removePhoto(e) {
    const i = e.currentTarget.dataset.index;
    const photos = this.data.photos.filter((_, idx) => idx !== i);
    this.setData({ photos });
  },

  async saveAlbum() {
    const { albumDate, albumName, photos } = this.data;
    if (!photos.length) {
      wx.showToast({ title: '请至少添加一张图片', icon: 'none' });
      return;
    }
    this.setData({ uploading: true });
    const albumId = 'album_' + Date.now();
    const fileIDs = [];
    try {
      for (let i = 0; i < photos.length; i++) {
        const p = photos[i];
        const path = p.tempFilePath || p;
        const cloudPath = `albums/${albumId}/${i}.jpg`;
        const res = await wx.cloud.uploadFile({ cloudPath, filePath: path });
        fileIDs.push(res.fileID);
      }
      const dateLabel = this._formatDateLabel(albumDate);
      const addRes = await db.collection('albums').add({
        data: {
          albumName: albumName || '未命名相册',
          date: albumDate,
          dateLabel,
          photoFileIds: fileIDs,
        },
      });
      const docId = addRes._id;
      wx.showToast({ title: '保存成功', icon: 'success' });
      setTimeout(() => {
        wx.redirectTo({ url: '/pages/albumTimeline/albumTimeline' });
      }, 500);
    } catch (err) {
      console.error(err);
      wx.showToast({ title: '保存失败，请检查云开发、网络与域名校验', icon: 'none', duration: 2500 });
    } finally {
      this.setData({ uploading: false });
    }
  },

  _formatDateLabel(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-').map(Number);
    return `${parts[1]}月${parts[2]}日`;
  },
});
