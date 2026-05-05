const {
  ALBUM_PAGE_BG,
  PHOTO_URLS_2015,
} = require('../../utils/albumPhotoUrls.js');
const { resolveCloudTempUrls } = require('../../utils/resolveCloudTempUrls.js');
const { resumeBackgroundMusic } = require('../../utils/bgm.js');

const LABELS_2015 = [
  '2015级1班',
  '2015级2班',
  '2015级3班',
  '2015级4班',
  '2015级年级合照（一）',
  '2015级年级合照（二）',
];

Page({
  data: {
    bgSrc: ALBUM_PAGE_BG,
    albumItems: [],
  },

  onLoad() {
    const items = PHOTO_URLS_2015.map((fileId, i) => ({
      label: LABELS_2015[i],
      src: fileId,
      fileId,
    }));
    // 先同步用 cloud:// 铺满首屏，避免等异步导致真机白屏
    this.setData({ albumItems: items });

    const ids = [ALBUM_PAGE_BG, ...PHOTO_URLS_2015];
    resolveCloudTempUrls(ids).then((urls) => {
      if (!urls || !urls.length) return;
      const bg = urls[0] || ALBUM_PAGE_BG;
      const albumItems = PHOTO_URLS_2015.map((fileId, i) => ({
        label: LABELS_2015[i],
        src: urls[i + 1] || fileId,
        fileId,
      }));
      this.setData({ bgSrc: bg, albumItems });
    });
  },

  onShow() {
    resumeBackgroundMusic();
  },

  onBackTap() {
    wx.navigateBack({ delta: 1 });
  },

  onPhotoTap(e) {
    const { fileid } = e.currentTarget.dataset;
    if (!fileid) return;
    wx.previewImage({
      current: fileid,
      urls: PHOTO_URLS_2015,
    });
  },
});
