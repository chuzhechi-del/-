const {
  ALBUM_PAGE_BG,
  PHOTO_URLS_2017,
} = require('../../utils/albumPhotoUrls.js');
const { resolveCloudTempUrls } = require('../../utils/resolveCloudTempUrls.js');
const { resumeBackgroundMusic } = require('../../utils/bgm.js');

const LABELS_2017 = Array.from({ length: 10 }, (_, i) => `2017级${i + 1}班`);

Page({
  data: {
    bgSrc: ALBUM_PAGE_BG,
    albumItems: [],
  },

  onLoad() {
    const items = PHOTO_URLS_2017.map((fileId, i) => ({
      label: LABELS_2017[i],
      src: fileId,
      fileId,
    }));
    this.setData({ albumItems: items });

    const ids = [ALBUM_PAGE_BG, ...PHOTO_URLS_2017];
    resolveCloudTempUrls(ids).then((urls) => {
      if (!urls || !urls.length) return;
      const bg = urls[0] || ALBUM_PAGE_BG;
      const albumItems = PHOTO_URLS_2017.map((fileId, i) => ({
        label: LABELS_2017[i],
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
      urls: PHOTO_URLS_2017,
    });
  },
});
