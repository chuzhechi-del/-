/** 与首页共用的云存储背景音乐地址 */
const CLOUD_PREFIX =
  'cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582';
const BGM_URL = `${CLOUD_PREFIX}/背景音乐.mp3`;

/**
 * 预览大图等操作会暂停 BackgroundAudioManager，页面回到前台时恢复播放。
 */
function resumeBackgroundMusic() {
  try {
    const mgr = wx.getBackgroundAudioManager();
    if (!mgr.src) return;
    const same =
      mgr.src === BGM_URL ||
      (typeof mgr.src === 'string' && mgr.src.indexOf('背景音乐.mp3') !== -1);
    if (!same) return;
    if (mgr.paused) {
      mgr.play();
    }
  } catch (e) {
    // ignore
  }
}

module.exports = {
  BGM_URL,
  resumeBackgroundMusic,
};
