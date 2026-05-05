// 首页 - 底图 + 两段打字机 + 雾蒙蒙转场 + 开始按钮
const CLOUD_PREFIX = 'cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582';
const { BGM_URL } = require('../../utils/bgm.js');
const KAI_FONT_FILE_ID = CLOUD_PREFIX + '/演示魁本楷书.ttf';
const KAI_FONT_FAMILY = 'DemoKaiShu';

const TEXT_1 = `金色银杏，秋意翩翩，
绿荫红墙，夏影点点。
教室里的读书声,
送走了一个又一个夏天。

你是否还能记起
那些藏在学智路901的诗篇？`;

const TEXT_2 = `亲爱的同学们，欢迎回家！
和我们一起翻开这本时光相册，
看看从前的你吧！`;

Page({
  data: {
    displayText: '',
    overlayOpacity: 0,
    /** 两页背景同时挂载，仅切换显隐，避免改 src 造成重新加载、观感割裂 */
    bg1: CLOUD_PREFIX + '/1.png',
    bg2: CLOUD_PREFIX + '/2.png',
    showStartButton: false,
    isSecondPhase: false,
  },

  typewriterTimer: null,
  fadeTimer: null,
  charIndex: 0,
  currentFullText: TEXT_1,

  onLoad() {
    this.currentFullText = TEXT_1;
    this.charIndex = 0;
    this._initBackgroundMusic();
    this._ensureKaiFontLoaded();
    this._startTypewriter();
  },

  onUnload() {
    if (this.typewriterTimer) clearTimeout(this.typewriterTimer);
    if (this.fadeTimer) clearInterval(this.fadeTimer);
  },

  _startTypewriter() {
    const fullText = this.currentFullText;
    const delay = 260;

    const tick = () => {
      if (this.charIndex >= fullText.length) {
        this.typewriterTimer = null;
        if (fullText === TEXT_1) {
          setTimeout(() => this._fadeInFog(), 3000);
        } else {
          // 第二段文案打完后，等待 1.5 秒再显示「开始」液态玻璃按钮
          setTimeout(() => {
            this.setData({ showStartButton: true });
          }, 1500);
        }
        return;
      }
      this.setData({
        displayText: fullText.slice(0, this.charIndex + 1),
      });
      this.charIndex += 1;
      this.typewriterTimer = setTimeout(tick, delay);
    };

    this.typewriterTimer = setTimeout(tick, delay);
  },

  _initBackgroundMusic() {
    try {
      const mgr = wx.getBackgroundAudioManager();
      // 避免重复重置正在播放的背景音乐
      if (mgr.src === BGM_URL && !mgr.paused) {
        return;
      }
      mgr.title = '背景音乐';
      mgr.loop = true;
      mgr.src = BGM_URL;
    } catch (e) {
      console.error('初始化背景音乐失败', e);
    }
  },

  _ensureKaiFontLoaded() {
    // 不能在 CSS 的 @font-face 里直接用 cloud:// fileID
    // 这里通过临时 HTTPS 链接 + wx.loadFontFace 动态加载字体，保证真机预览可用
    const cached = wx.getStorageSync('kaiti_temp_url');
    const cachedAt = wx.getStorageSync('kaiti_temp_url_at');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const loadWithUrl = (url) => {
      if (!url) return;
      wx.loadFontFace({
        family: KAI_FONT_FAMILY,
        source: `url("${url}")`,
      });
    };

    if (cached && cachedAt && now - cachedAt < oneDay) {
      loadWithUrl(cached);
      return;
    }

    // 云端换取临时下载链接
    wx.cloud.getTempFileURL({
      fileList: [KAI_FONT_FILE_ID],
      success: (res) => {
        const info = (res.fileList || [])[0];
        const tempUrl = info && info.tempFileURL;
        if (tempUrl) {
          wx.setStorageSync('kaiti_temp_url', tempUrl);
          wx.setStorageSync('kaiti_temp_url_at', now);
          loadWithUrl(tempUrl);
        }
      },
      fail: (err) => {
        console.error('获取字体临时链接失败', err);
      },
    });
  },

  _fadeInFog() {
    let opacity = 0;
    const step = 0.12;      // 原来是 0.08，稍微加快一点
    const interval = 45;
    this.fadeTimer = setInterval(() => {
      opacity += step;
      if (opacity >= 0.96) {
        clearInterval(this.fadeTimer);
        this.fadeTimer = null;
        // 第一页逐渐变白 → 一旦完全变白，立即切换到第二个背景并去掉白层，然后再开始第二段打字机
        this.setData({
          displayText: '',
          overlayOpacity: 0,
          isSecondPhase: true,
        }, () => {
          this.charIndex = 0;
          this.currentFullText = TEXT_2;
          this._startTypewriter();
        });
        return;
      }
      this.setData({ overlayOpacity: opacity });
    }, interval);
  },

  onStartTap() {
    wx.navigateTo({ url: '/pages/albumTimeline/albumTimeline' });
  },
});
