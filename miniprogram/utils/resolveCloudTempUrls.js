/**
 * 批量换取云文件临时 HTTPS 链接，供 image 使用（真机上 cloud:// 直链偶发空白）。
 * @param {string[]} fileIDs
 * @returns {Promise<string[]>} 与 fileIDs 同序；单项失败则回退为原 fileID
 */
function resolveCloudTempUrls(fileIDs) {
  const list = (fileIDs || []).filter(Boolean);
  if (!list.length) {
    return Promise.resolve([]);
  }
  return new Promise((resolve) => {
    if (!wx.cloud || !wx.cloud.getTempFileURL) {
      resolve(list);
      return;
    }
    wx.cloud.getTempFileURL({
      fileList: list,
      success: (res) => {
        const fl = res.fileList || [];
        const byId = {};
        fl.forEach((item) => {
          if (item && item.fileID && item.tempFileURL) {
            byId[item.fileID] = item.tempFileURL;
          }
        });
        const out = list.map((fid) => (byId[fid] ? byId[fid] : fid));
        resolve(out);
      },
      fail: () => resolve(list),
    });
  });
}

module.exports = {
  resolveCloudTempUrls,
};
