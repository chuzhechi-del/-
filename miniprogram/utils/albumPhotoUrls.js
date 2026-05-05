/** 与各年级 album 页、时光轴预加载共用，避免 URL 不一致 */

const CLOUD_ROOT =
  'cloud://timeabulm-5gi8yiop0ed0acf9.7469-timeabulm-5gi8yiop0ed0acf9-1406692582';

/** 第三页时光轴背景 */
const TIMELINE_BG = `${CLOUD_ROOT}/3.png`;
/** 第四页（各年级相册）背景 */
const ALBUM_PAGE_BG = `${CLOUD_ROOT}/4.png`;

const PHOTO_URLS_2015 = [
  `${CLOUD_ROOT}/albums/2015级毕业照/1班.jpg`,
  `${CLOUD_ROOT}/albums/2015级毕业照/2班.jpg`,
  `${CLOUD_ROOT}/albums/2015级毕业照/3班.jpg`,
  `${CLOUD_ROOT}/albums/2015级毕业照/4班.jpg`,
  `${CLOUD_ROOT}/albums/2015级毕业照/年级合照1.jpg`,
  `${CLOUD_ROOT}/albums/2015级毕业照/年级合照2.jpg`,
];

const PHOTO_URLS_2016 = [
  `${CLOUD_ROOT}/albums/2016级毕业照/2016级1班.jpg`,
  `${CLOUD_ROOT}/albums/2016级毕业照/2016级2班.jpg`,
  `${CLOUD_ROOT}/albums/2016级毕业照/2016级3班.jpg`,
  `${CLOUD_ROOT}/albums/2016级毕业照/2016级4班.jpg`,
  `${CLOUD_ROOT}/albums/2016级毕业照/2016级5班.jpg`,
  `${CLOUD_ROOT}/albums/2016级毕业照/2016级6班.jpg`,
  `${CLOUD_ROOT}/albums/2016级毕业照/2016级7班.jpg`,
];

const PHOTO_URLS_2017 = [
  `${CLOUD_ROOT}/albums/2017级毕业照/1班.png`,
  `${CLOUD_ROOT}/albums/2017级毕业照/2班.png`,
  `${CLOUD_ROOT}/albums/2017级毕业照/3班.png`,
  `${CLOUD_ROOT}/albums/2017级毕业照/4班.png`,
  `${CLOUD_ROOT}/albums/2017级毕业照/5班.png`,
  `${CLOUD_ROOT}/albums/2017级毕业照/6班.png`,
  `${CLOUD_ROOT}/albums/2017级毕业照/7班.png`,
  `${CLOUD_ROOT}/albums/2017级毕业照/8班.png`,
  `${CLOUD_ROOT}/albums/2017级毕业照/9班.png`,
  `${CLOUD_ROOT}/albums/2017级毕业照/10班.png`,
];

const PHOTO_URLS_2018 = [
  `${CLOUD_ROOT}/albums/2018级毕业照/1班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/2班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/3班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/4班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/5班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/7班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/7班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/8班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/9班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/10班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/11班.jpg`,
  `${CLOUD_ROOT}/albums/2018级毕业照/12班.jpg`,
];

const PHOTO_URLS_2019 = [
  `${CLOUD_ROOT}/albums/2019级毕业照/1班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/2班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/3班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/4班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/5班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/6班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/7班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/8班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/9班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/10班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/11班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/12班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/13班.jpg`,
  `${CLOUD_ROOT}/albums/2019级毕业照/14班.jpg`,
];

const YEAR_TO_PHOTOS = {
  2015: PHOTO_URLS_2015,
  2016: PHOTO_URLS_2016,
  2017: PHOTO_URLS_2017,
  2018: PHOTO_URLS_2018,
  2019: PHOTO_URLS_2019,
};

function getNavigatePreloadUrls(year) {
  const photos = YEAR_TO_PHOTOS[year];
  if (!photos) return [ALBUM_PAGE_BG];
  return [ALBUM_PAGE_BG, ...photos];
}

/** 第三页进入后台预加载：去重后的全部云图 + 共用底图 */
const ALL_ALBUM_PRELOAD_URLS = [
  ...new Set([
    TIMELINE_BG,
    ALBUM_PAGE_BG,
    ...PHOTO_URLS_2015,
    ...PHOTO_URLS_2016,
    ...PHOTO_URLS_2017,
    ...PHOTO_URLS_2018,
    ...PHOTO_URLS_2019,
  ]),
];

module.exports = {
  TIMELINE_BG,
  ALBUM_PAGE_BG,
  PHOTO_URLS_2015,
  PHOTO_URLS_2016,
  PHOTO_URLS_2017,
  PHOTO_URLS_2018,
  PHOTO_URLS_2019,
  getNavigatePreloadUrls,
  ALL_ALBUM_PRELOAD_URLS,
};
