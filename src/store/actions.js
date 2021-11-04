import {
  RECEIVE_RECOMMENDSONG,
  RECEIVE_NEWESTSONG,
  RECEIVE_HOTSONG,
  RECEIVE_SEARCH_SUGGEST,
  CHANGE_ICON_PLAY,
  RECEIVE_USER_SONG_LIST,
  RECEIVE_SONG_URL,
  VERIFY_MUSIC
} from './mutations-type.js'
import {
  reqRecommendSong,
  reqNewestSong,
  reqHotSong,
  reqSearchSuggest,
  reqUserSongList,
  reqSongUrl,
  reqVerifyMusic
} from '../api/index'

export default {
  async getRecommendSong ({commit}) {
    const result = await reqRecommendSong()
    if (result.code === 200) {
      const recommendSong = result.result
      commit(RECEIVE_RECOMMENDSONG, {recommendSong})
    }
  },
  async getNewestSong ({commit}) {
    const result = await reqNewestSong()
    if (result.code === 200) {
      const newestSong = result.result
      commit(RECEIVE_NEWESTSONG, {newestSong})
    }
  },
  async getHotSong ({commit}) {
    const result = await reqHotSong()
    if (result.code === 200) {
      const hotsong = result.result
      commit(RECEIVE_HOTSONG, {hotsong})
    }
  },
  async getSearchSuggest ({commit}, keyword) {
    const result = await reqSearchSuggest(keyword)
    if (result.code === 200) {
      const searchSuggest = result.result
      commit(RECEIVE_SEARCH_SUGGEST,{searchSuggest})
    }
  },
  changeIconPlay ({commit}) {
    commit(CHANGE_ICON_PLAY)
  },
  async getUserSongList ({commit},id) {
    const result = await reqUserSongList(id)
    console.log(result);
    if (result.code === 200) {
      const UserSongList = result.playlist
      commit(RECEIVE_USER_SONG_LIST, {UserSongList})
    }
  },
  async getSongUrl ({commit},id) {
    const result = await reqSongUrl(id)
    if (result.code === 200) {
      const SongUrl = result.data
      commit(RECEIVE_SONG_URL, {SongUrl})
    }
  },
  async getVerifyMusic ({commit},id) {
      const result = await reqVerifyMusic(id)
      const verifyMusic = result.success
      commit(VERIFY_MUSIC, {verifyMusic})
  }
}