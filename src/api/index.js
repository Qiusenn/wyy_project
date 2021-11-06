/*
包含多个接口请求的模块
*/
import ajax from './ajax'
// 请求页面推荐歌曲以及图片
export const reqRecommendSong = () => ajax('https://apis.netstart.cn/music/personalized?limit=6')
// 请求最新歌曲
export const reqNewestSong = () => ajax('https://apis.netstart.cn/music/personalized/newsong')
// 请求热搜列表
export const reqHotSong = () => ajax('https://apis.netstart.cn/music/search/hot')
// 请求搜索建议
export const reqSearchSuggest = (keyword) => ajax(`https://apis.netstart.cn/music/search?keywords=${keyword}`)
// 获取点击的input值并搜索显示对应的歌曲，(相同相似的歌曲)
export const reqAlikeSongList = (keyword) => ajax(`https://apis.netstart.cn/music/cloudsearch?keywords=${keyword}`)
// 获取用户推荐歌单
export const reqUserSongList = (id) => ajax(`https://apis.netstart.cn/music/playlist/detail?id=${id}`)
// 获取音乐url
export const reqSongUrl = (id) => ajax(`https://apis.netstart.cn/music/song/url?id=${id}`)
// 获取音乐是否可以播放
export const reqVerifyMusic = (id) => ajax(`https://apis.netstart.cn/music/check/music?id=${id}`)
// 获取歌词
export const reqLyric = (id) => ajax(`https://apis.netstart.cn/music/lyric?id=${id}`)