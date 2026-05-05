/**
 * 腾讯云 CloudBase · AnyService 调用封装。
 * 控制台「服务标识」须与 SERVICE_NAME 一致（当前：myapi）。
 *
 * 注意：这与「互联网上能搜到你的小程序」不是同一回事。
 * AnyService = 后端联网；可被搜索需在 mp.weixin.qq.com → 小程序 → 设置 中开启并满足微信检索规则，
 * 且 sitemap.json 已对页面开放抓取（本项目已允许 *）。
 */
const SERVICE_NAME = 'myapi';

const ANY_SERVICE_GATEWAY = 'tcb-anyservice';

function buildHeaders(extra) {
  return {
    'X-NX-SERVICE': ANY_SERVICE_GATEWAY,
    'X-AnyService-Name': SERVICE_NAME,
    'content-type': 'application/json',
    ...extra,
  };
}

/**
 * 通过 AnyService 访问你在控制台配置的源站（HTTP）。
 * @param {{ path?: string; method?: string; data?: Object; header?: Object }} opts
 */
function request(opts = {}) {
  const { path = '/', method = 'POST', data = {}, header = {} } = opts;
  if (!wx.cloud || typeof wx.cloud.callContainer !== 'function') {
    return Promise.reject(new Error('当前基础库或环境不支持 wx.cloud.callContainer，请确认已开通任意服务并完成云初始化'));
  }
  return wx.cloud.callContainer({
    path,
    method,
    data,
    header: buildHeaders(header),
  });
}

module.exports = {
  SERVICE_NAME,
  ANY_SERVICE_GATEWAY,
  request,
};
