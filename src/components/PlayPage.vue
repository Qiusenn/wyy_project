<template>
  <div class="page">
    <div class="goback" @click="$parent.shopFullSongPage=false"></div>
    <div class="mask" v-if="receSong.song" :style="{backgroundImage:'url('+receSong.picUrl+')'}"></div>
    <div class="mask" v-else-if="receSong.al.name" :style="{backgroundImage:'url('+receSong.al.picUrl+')'}"></div>
    <div class="page_title">
      <h5>{{receSong.name}}</h5>
      <span v-if="receSong.song">{{receSong.song.artists[0].name}}</span>
      <span v-else-if="receSong.al.name">{{receSong.al.name}}</span>
    </div>
    <!-- 唱片歌词切换 -->
    <keep-alive>
    <PlayDisc v-if="showDisc" @click.native="showDisc = false" :receSong="receSong" :playState="playState"/>
    <!-- 歌词组件 -->
    <PlayIyric 
    v-else 
    :playState="playState"
    @click.native="showDisc = true" 
    :currentTime="currentTime"/>
    </keep-alive>
    <!-- 底部控制 -->
    <div class="footer">
      <div class="bar">
        <span :style="{ width: (value / currentDuration) * 100 + '%' }"></span>
      </div>
      <input type="range" 
      min="0"
      :max="currentDuration"
      v-model="value"
      @change="changeHandler"
      @input="inputing = true"
      >
      <div class="control">
        <span></span>
        <span></span>
        <span @click="changePlay" :class="{action:playState}" ></span>
        <span></span>
        <span @click="showSongList = true"></span>
      </div>
    </div>

      <MaskBg
        v-if="showSongList"
        :showSongList="showSongList"
        :playState="playState"
        @uptada:showSongList="showSongList=$event"
      />

  </div>
</template>

<script>
import PlayDisc from './PlayDisc'
import PlayIyric from './PlayIyric'
import MaskBg from './Mask'
import {mapActions, mapState} from 'vuex'
export default {
  data() {
    return {
      inputing: false,
      value: this.currentTime,
      showDisc: true, // 默认展示唱片
      showSongList:false
    }
  },
  computed: {
    ...mapState(['lyric'])
  },
  components: {PlayDisc,PlayIyric,MaskBg},
  props: ['receSong','currentTime','playState','currentDuration'],
  methods: {
    ...mapActions(['getLyric']),
    changePlay () {
      this.$bus.$emit('changeIconPlay',!this.playState)
    },
    // 改变父组件的当前歌曲更新时间(秒)
    changeHandler: function () {
      this.inputing = false;
      this.$emit("update:current-time", this.value);
    },
  },
  mounted () {
    this.getLyric(this.receSong.id)
  },
  watch: {
    currentTime: function (n) {
      if (!this.inputing) {
        this.value = n;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>

.page
  position: fixed
  text-align: center
  top 0
  left: 0
  // background-color: pink
  width 100vw
  height 100vh
  .goback
    position: absolute
    background: url('../../public/static/images/dj3.png') no-repeat
    background-size: 30px auto
    top 15px
    left: 15px
    height 30px
    width 30px
    // background-color: green
  // 遮罩层
  .mask
    z-index: -1
    position: absolute
    top 0
    left: 0 
    width 100%
    height 100%
    overflow: hidden
    background-size: cover
    background-position: center
    filter: blur(15px) brightness(.5);
    transform: scale(1.2);

  /* 标题 */
  .page_title
    h5
      color: rgb(242, 242, 242)
      font-size: 20px
      font-weight: 500
      margin-top: 15px
    span
      color: rgb(147, 144, 145)
      font-size: 14px

  /* 底部控制 */
  .footer
    width 100%
    position: absolute
    bottom: 0
    left: 0
    .bar
      width 75%
      height 2px
      background: rgba(255, 255, 255, 0.1);
      margin: 0 auto 0
      span
        display: block;
        height: 100%;
        width: 0%;
        background: rgba(255, 255, 255, 0.1);
        align-items: center;
        position: relative;
        &::after {
          content: "";
          display: block;
          width: 8px;
          height: 8px;
          background: white;
          // transform: translate(5px, -4px);
          position: absolute;
          right: -15px;
          top: -3px;
          border-radius: 50%;
        }

    input
      opacity 0
      width: 75%
    .control
      width 100%
      display: flex
      justify-content: center
      align-items: center
      span
        display: block
        width 30px
        height 30px
        // background: pink
        background-size: 30px auto;
        background-position: center;
        
        margin: 20px 10px
        &:nth-child(1)
          background-image: url('../../public/static/images/dud.png')
        &:nth-child(2)
          background-image: url('../../public/static/images/dsz.png')
        &:nth-child(4)
          background-image: url('../../public/static/images/dst.png')
        &:nth-child(5)
          background-image: url('../../public/static/images/dvd.png')
        &:nth-child(3)
          width 50px
          height 50px
          background-size: 100% auto
          background-image: url('../../public/static/images/dsx.png')
          &.action
            background-image: url('../../public/static/images/dsv.png')

</style>