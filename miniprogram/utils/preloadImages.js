/**
 * 使用 wx.getImageInfo 将云文件/网络图拉入本地缓存，减轻第四页等页面首屏空白。
 * 分块并发，避免真机一次发起过多请求。
 */
function preloadOne(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(false);
      return;
    }
    wx.getImageInfo({
      src,
      success: () => resolve(true),
      fail: () => resolve(false),
    });
  });
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

/**
 * @param {string[]} urls
 * @param {{ concurrency?: number }} [options] 每批并行数量，默认 8
 */
function preloadCloudImages(urls, options = {}) {
  const concurrency = typeof options.concurrency === 'number' ? options.concurrency : 8;
  const unique = [...new Set((urls || []).filter(Boolean))];
  const batches = chunk(unique, concurrency);
  return batches.reduce(
    (chain, batch) => chain.then(() => Promise.all(batch.map(preloadOne))),
    Promise.resolve(),
  );
}

module.exports = {
  preloadCloudImages,
};
