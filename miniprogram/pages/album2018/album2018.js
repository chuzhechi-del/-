const {
  ALBUM_PAGE_BG,
  PHOTO_URLS_2018,
} = require('../../utils/albumPhotoUrls.js');
const { resolveCloudTempUrls } = require('../../utils/resolveCloudTempUrls.js');
const { resumeBackgroundMusic } = require('../../utils/bgm.js');

const LABELS_2018 = [
  '2018级1班',
  '2018级2班',
  '2018级3班',
  '2018级4班',
  '2018级5班',
  '2018级7班',
  '2018级7班',
  '2018级8班',
  '2018级9班',
  '2018级10班',
  '2018级11班',
  '2018级12班',
];

Page({
  data: {
    bgSrc: ALBUM_PAGE_BG,
    albumItems: [],
  },

  onLoad() {
    const items = PHOTO_URLS_2018.map((fileId, i) => ({
      label: LABELS_2018[i],
      src: fileId,
      fileId,
    }));
    this.setData({ albumItems: items });

    const ids = [ALBUM_PAGE_BG, ...PHOTO_URLS_2018];
    resolveCloudTempUrls(ids).then((urls) => {
      if (!urls || !urls.length) return;
      const bg = urls[0] || ALBUM_PAGE_BG;
      const albumItems = PHOTO_URLS_2018.map((fileId, i) => ({
        label: LABELS_2018[i],
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
      urls: PHOTO_URLS_2018,
    });
  },
});
