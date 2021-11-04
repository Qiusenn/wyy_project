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

export default {
  [RECEIVE_RECOMMENDSONG] (state, {recommendSong}) {
    state.recommendSong = recommendSong
  },
  [RECEIVE_NEWESTSONG] (state, {newestSong}) {
    state.newestSong = newestSong
  },
  [RECEIVE_HOTSONG] (state, {hotsong}) {
    state.hotsong = hotsong
  },
  [RECEIVE_SEARCH_SUGGEST] (state, {searchSuggest}) {
    state.searchSuggest = searchSuggest
  },
  [CHANGE_ICON_PLAY] (state) {
    state.iconIsPlay = !state.iconIsPlay
  },
  [RECEIVE_USER_SONG_LIST] (state, {UserSongList}) {
    state.UserSongList = UserSongList
  },
  [RECEIVE_SONG_URL] (state, {SongUrl}) {
    state.SongUrl = SongUrl
  },
  [VERIFY_MUSIC] (state, {verifyMusic}) {
    state.verifyMusic = verifyMusic
  }
}