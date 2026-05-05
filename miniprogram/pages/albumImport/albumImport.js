// 导入云存储相册：为「xxxx届毕业照」填写 fileID 列表，按年份写入数据库，时间轴从远到近、左右交替展示
const db = wx.cloud.database();

const DEFAULT_ALBUMS = [
  {
    year: 2015,
    name: '2015级毕业照',
    fileIdsText: `cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2015级毕业照/1班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2015级毕业照/2班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2015级毕业照/3班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2015级毕业照/4班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2015级毕业照/年级合照1.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2015级毕业照/年级合照2.jpg`,
  },
  {
    year: 2016,
    name: '2016级毕业照',
    fileIdsText: `cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2016级毕业照/2016级1班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2016级毕业照/2016级2班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2016级毕业照/2016级3班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2016级毕业照/2016级4班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2016级毕业照/2016级5班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2016级毕业照/2016级6班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2016级毕业照/2016级7班.jpg`,
  },
  {
    year: 2017,
    name: '2017级毕业照',
    fileIdsText: `cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/1班.png
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/2班.png
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/3班.png
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/4班.png
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/5班.png
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/6班.png
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/7班.png
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/8班.png
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/9班.png
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2017级毕业照/10班.png`,
  },
  {
    year: 2018,
    name: '2018级毕业照',
    fileIdsText: `cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/1班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/2班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/3班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/4班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/5班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/6班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/7班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/8班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/9班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/10班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/11班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2018级毕业照/12班.jpg`,
  },
  {
    year: 2019,
    name: '2019级毕业照',
    fileIdsText: `cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/1班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/2班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/3班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/4班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/5班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/6班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/7班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/8班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/9班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/10班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/11班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/12班.jpg
cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582/albums/2019级毕业照/13班.jpg`,
  },
];

Page({
  data: {
    statusBarHeight: 20,
    menuButton: { width: 87, height: 32 },
    albums: DEFAULT_ALBUMS.map(a => ({ ...a, fileIdsText: a.fileIdsText || '' })),
    saving: false,
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      statusBarHeight: sys.statusBarHeight || 20,
      menuButton: { width: menu.width, height: menu.height },
    });
  },

  onBack() {
    wx.navigateBack({ delta: 1 });
  },

  onFileIdsInput(e) {
    const { index } = e.currentTarget.dataset;
    const value = (e.detail.value || '').trim();
    const albums = this.data.albums.map((a, i) =>
      i === index ? { ...a, fileIdsText: value } : a
    );
    this.setData({ albums });
  },

  async onImport() {
    const albums = this.data.albums
      .map(a => {
        const ids = (a.fileIdsText || '')
          .split(/[\n,，]/)
          .map(s => s.trim())
          .filter(Boolean);
        return { ...a, fileIds: ids };
      })
      .filter(a => a.fileIds.length > 0);

    if (albums.length === 0) {
      wx.showToast({ title: '请至少填写一个相册的 fileID 列表', icon: 'none' });
      return;
    }

    this.setData({ saving: true });
    try {
      // 删除“原始相册”（创建相册页上传产生的 albums/album_* 路径），并清理其数据库记录
      // 不会删除你手动上传的 albums/2015级毕业照 等文件夹图片
      const pageSize = 100;
      let skip = 0;
      const docsToRemove = [];
      const fileIdsToDelete = [];
      const isOldAppAlbumFileId = (fid) => typeof fid === 'string' && fid.includes('/albums/album_');

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const existing = await db.collection('albums').skip(skip).limit(pageSize).get();
        const list = existing.data || [];
        if (list.length === 0) break;
        for (const doc of list) {
          const ids = Array.isArray(doc.photoFileIds) ? doc.photoFileIds : [];
          const oldIds = ids.filter(isOldAppAlbumFileId);
          if (oldIds.length > 0) {
            docsToRemove.push(doc._id);
            fileIdsToDelete.push(...oldIds);
          }
        }
        if (list.length < pageSize) break;
        skip += pageSize;
      }

      // 先删云存储文件（按批次）
      const batchSize = 50;
      for (let i = 0; i < fileIdsToDelete.length; i += batchSize) {
        const batch = fileIdsToDelete.slice(i, i + batchSize);
        // eslint-disable-next-line no-await-in-loop
        await wx.cloud.deleteFile({ fileList: batch });
      }

      // 再删数据库记录
      for (const id of docsToRemove) {
        // eslint-disable-next-line no-await-in-loop
        await db.collection('albums').doc(id).remove();
      }

      for (const a of albums) {
        const date = `${a.year}-06-01`;
        const dateLabel = `${a.year}级毕业`;
        await db.collection('albums').add({
          data: {
            albumName: a.name,
            date,
            dateLabel,
            photoFileIds: a.fileIds,
          },
        });
      }
      wx.showToast({ title: '已删除原始相册并导入毕业照', icon: 'success' });
      setTimeout(() => {
        wx.navigateTo({ url: '/pages/albumTimeline/albumTimeline' });
      }, 800);
    } catch (err) {
      console.error(err);
      wx.showToast({ title: '导入失败，请检查云开发与网络', icon: 'none', duration: 2500 });
    } finally {
      this.setData({ saving: false });
    }
  },
});
