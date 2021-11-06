<template>
  <div class="SongCarList" v-if="UserSongList.coverImgUrl">
    <div class="SongCarList_Box">
      <div class="CarListImg"><img :src="UserSongList.coverImgUrl+'?param=126y126'" alt=""></div>
      <div class="CarListDec">
        <p>{{UserSongList.name}}</p>
        <span class="icon_header"><img :src="UserSongList.creator.avatarUrl+'?param=126y126'" alt=""></span>
        <span class="user_name">{{UserSongList.creator.nickname}}</span>
      </div>
      <div class="mask"><img :src="UserSongList.coverImgUrl" alt=""></div>
    </div>
    <h3>歌曲列表</h3>
    <ul>
      <SongItem_second :song="track" :index="index"
      v-bind="$attrs"
      :isPlay="isPlay"
      @click.native="app($event,index)"
      :playState="playState"
      v-for="(track, index) in UserSongList.tracks" :key="track.id">
      <span class="number">{{index++ >= 9? index++:'0'+index++}}</span>
      </SongItem_second>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import SongItem_second from '../components/SongItem_second'
export default {
  props: ["playState"],
  data() {
    return {
        isPlay: null,
    };
  },
  mounted () {
    this.getUserSongList(this.$route.query.id)
  },
  updated () {
    if (this.currentPlaySongList === this.UserSongList.tracks) {
      return
    }
    this.UpdateCurrentSongList(this.UserSongList.tracks)
  },
  methods: {
    ...mapActions(['getUserSongList', 'UpdateCurrentSongList']),
    // 排他
    app (e,index) {
      index = index - 2
      this.isPlay = index
    }
  },
  computed: {
    ...mapState(['UserSongList', 'currentPlaySongList'])
  },
  components: {SongItem_second}
};
</script>

<style lang="stylus" scoped>
.SongCarList
  padding-bottom: 50px;
  .SongCarList_Box
    padding-bottom: 50px
    box-sizing: border-box;
    position: relative
    overflow hidden
    .mask
      width 100%
      height 100%
      position: absolute
      top 0
      left 0
      z-index: -1
      transform: scale(1.4)
      filter: blur(30px)
      img
        width 100%
        height 100%
    padding: 30px 15px
    width 100%
    display: flex
    .CarListDec
      margin-left: 15px
      p
        color: white
        font-size: 18px
        margin-top: 10px
        margin-bottom: 30px
      .icon_header 
        width 40px
        width 35px
        height 35px
        border-radius: 35px
        vertical-align: middle
        img 
          display: inline-block
          width: 35px
          height 35px
          border-radius: 35px
      .user_name
        margin-left: 10px
        color: rgb(197, 197, 192)

  h3
    color: rgb(163, 166, 173)
    background-color: rgb(238, 239, 240)
    padding: 5px 0 5px 10px
    font-size: 13px
  ul
    margin-left: 10px

    
</style>