<template>
<div>
  <Header v-if="!shopFullSongPage" />
  <router-view :playState="playState" ></router-view>
  <!-- 底部歌曲展示 -->
  <div class="audio_box">
    <div class="audio_box_left" v-if="receSong" @click="shopFullSongPage=true">
      <img class="album spinImg" :class="{stopSpinImg:!playState}"  :src="receSong.picUrl || receSong.al.picUrl" alt="">
      <div class="album_described">{{ receSong.name }} - 
        <span v-if="receSong.song">{{ receSong.song.artists[0].name}}</span>
        <span v-else>{{receSong.al.name}}</span>
      </div>
    </div>
    <div class="audio_box_right">
      <audio ref="audio" 
      @durationchange="onDuraTionChange"
      @timeupdate="onTimeUpDate" 
      v-if="SongUrl" :src="SongUrl[0].url"></audio>
      <audio ref="audio" 
      @durationchange="onDuraTionChange"
      @timeupdate="onTimeUpDate" 
      v-else src="https://www.w3school.com.cn/i/song.ogg"></audio>
      <span v-if="playState" @click="audio_play" class="span_icon">
        <i class="iconfont icon_play icon-24gl-pause" ></i>
        <canvas width="36" ref="canvas" height="36" 
      style="display:block;width:30px;height:30px"></canvas>
        </span>
      <span v-else @click="audio_play()" class="span_icon">
        <i class="iconfont icon_play icon-24gl-play"></i>
        <canvas width="36" ref="canvas" height="36" 
      style="display:block;width:30px;height:30px"></canvas>
      </span>
      
      <span @click="showSongList = true"><i class="iconfont icon-24gf-playlist play_list"></i></span>
    </div>
  </div>
  <transition name="fade">
    <playPage 
    :currentTime="currentTime"
    :playState="playState"
    v-if="shopFullSongPage"
    :receSong="receSong"
    :currentDuration="currentDuration"
    @update:current-time="changeCurrentTime"
  />
  </transition>
  <transition name="fade">
  <MaskBg
  v-if="showSongList"
  :showSongList="showSongList"
  :playState="playState"
  @uptada:showSongList="showSongList=$event"
  />
  </transition>
</div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions} from 'vuex'

import Header from './components/Header'
import playPage from './components/PlayPage'
import MaskBg from './components/Mask'
export default {
  data() {
    return {
      receSong: '', // 接收当前播放歌曲
      playState: false, // 播放状态
      shopFullSongPage: false, // 是否全屏展示当前唱片
      currentTime: 0, // 当前播放音乐的播放长度(实时更新)
      currentDuration: 0, // 当前音乐的总时长
      showSongList: false // 是否弹出列表
    }
  },
  computed: {
    ...mapState(['iconIsPlay', 'SongUrl', 'verifyMusic','newestSong']),
  },
  components: {Header,playPage,MaskBg},
  mounted () {
    // 全局事件总线，接收点击歌曲的数据
    this.$bus.$on('receiveSong', receSong => {
      this.receSong = receSong;
    })
    // 孙组件改变播放状态
    this.$bus.$on('changeIconPlay', value => {
      this.playState = value
    })
    axios.get('https://apis.netstart.cn/music/personalized/newsong').then( e => {
      this.receSong = e.data.result[0]
    })
  },
  beforeDestroy () {
    // 在销毁前 解绑全局事件总线receiveSong
    this.$bus.$off('receiveSong')
    this.$bus.$off('changeIconPlay')
  },
  watch: {
    playState (n) {
      if (n) {
      this.$refs.audio.play()
        return
      }
      this.$refs.audio.pause()
    },
    currentTime (n) {
      if (n === this.currentDuration) {
        this.playState = !this.playState
      }
      let content = this.$refs.canvas.getContext("2d")
      content.clearRect(0,0,36,36),
      content.beginPath()
      content.arc(18,18,17,(Math.PI / 180) * 360 * (this.currentTime / this.currentDuration) - 90,
      (Math.PI / 180) * 360)
      content.strokeStyle = "#ccc";
      content.stroke();
      content.closePath();
      content.beginPath();
      content.arc(
        18,
        18,
        17,
        (Math.PI / 180) * 0 - 90,
        (Math.PI / 180) * 360 * (this.currentTime / this.currentDuration) - 90
      );
      content.strokeStyle = "red";
      content.stroke();
    }
  },
  methods: {
    ...mapActions(['getSongUrl', 'reqSongUrl']),
    audio_play () { 
      this.playState = !this.playState
    },
    // 音乐播放 进度条更新事件
    onTimeUpDate () {
      this.currentTime = this.$refs.audio.currentTime
    },
    // 音乐播放返回当前音乐的时长 (秒)
    onDuraTionChange () {
      this.currentDuration = this.$refs.audio.duration
    },
    changeCurrentTime (n) {
    this.$refs.audio.currentTime = n
    },
    // showSongListFn (bool) {
    //   this.showSongListFn = bool
    // }
  },
}
</script>

<style lang="stylus" scoped>
  @keyframes rotatoImg {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity 0
  .audio_box
    position: fixed
    bottom: 0
    left: 0
    width 100%
    height 40px
    line-height: 40px
    background-color: white
    box-shadow: 0 0 5px 0 #ccc
    display: flex
    justify-content: space-between
    .audio_box_left
      position: relative
      .album
        position: absolute  
        top -14px
        left 12px
        width 40px
        height 40px
        border-radius: 20px
        z-index: 4
        &.spinImg
          animation rotatoImg 10s infinite linear
        &.stopSpinImg
          animation-play-state: paused
      .album_described
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 210px
        font-size: 12px
        margin-left: 60px

    .audio_box_right
      .span_icon
        display: flex
        align-items: center
        position: relative
      width 20%
      display: flex
      justify-content: space-around
      .icon_play
        position: absolute
        top 1px
        left 9px
        font-size: 15px
      .play_list
        font-size: 20px
    

</style>
