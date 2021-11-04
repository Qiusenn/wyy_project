<template>
  <li @click="gotoSongl()">
    <slot></slot>
    <div>
      <div>
        <h5>{{ song.name }}</h5>
        <i class="sghot"></i>
        <span class="song_name">{{song.ar[0].name}}</span>
      </div>
      <span class="play_icon" v-if="isPlay === index && playState"><i class="iconfont icon_play icon-zanting"></i></span>
      <span class="play_icon" v-else><i class="iconfont icon_play icon-bofang" ></i></span>
    </div>
  </li>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  props: ['song','isPlay','index','playState'],
  methods: {
    ...mapActions(['getSongUrl','getVerifyMusic']),
    gotoSongl () {
      this.getSongUrl(this.song.id)
      if (this.verifyMusic) {
        this.getSongUrl(this.song.id)
      }
      // 触发全局事件总线 receiveSong 传递当前点击的song数据
      this.$bus.$emit('receiveSong',this.song)
      this.$bus.$emit('changeIconPlay',!this.playState)
      // 异步延时调用方法
      setTimeout(() => {
        if (this.playState) {
        this.$parent.$parent.$refs.audio.play();
        return
      }
      this.$parent.$parent.$refs.audio.pause()
      }, 300);
    }
  },
  computed: {
    ...mapState(['SongUrl', 'verifyMusic'])
  },
};
</script>
<style lang="stylus" scoped>
  li
    
    width 100%
    padding: 5px 0
    display: flex
    box-sizing: border-box
    &:nth-child(-n+3)>span 
      color: red
    .number
      margin-right: 10px
      text-align: center
      font-size: 16px
      line-height: 45px
    h5 
      width 250px
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis
      font-size: 16px
    & >div
      border-bottom: 1px solid #F2F2F3
      padding: 5px 0
      box-sizing: border-box
      flex: 1
      display: flex
      justify-content: space-between
      align-items: center;
      & >div
        i 
          width 10px
          height 10px
          // background-color: pink
          margin-top: 10px
          background url("../../public/static/images/index_icon_2x.png")
          background-position: 0 2px
          background-size: 150px
          display: inline-block
      .song_name  
        display: inline-block
        margin-top: 10px
        margin-left: 5px
        color: #888888
        font-size: 12px
    .play_icon 
      margin-right: 10px
      display: block
      height 100%
      .icon_play
        font-size: 25px
        color: #ccc
</style>