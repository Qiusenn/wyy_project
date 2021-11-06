<template>
  <div class="iyric" :class="{playing:playState}">
    <ul class="content" ref="lisEl" 
    :style="{
      marginTop: `${ulHeight/2}px`,
      transform:`translateY(${frontLisHeight})`
      }">
      <li 
      v-for="(parsedL,index) in parsedLyric" 
      :key="index"
      :class="{active: currentLyricIndex === index}"
      ><span
      :class="{aaa:!playState}"
      :style="{
        animationDuration: `${
          index === parsedLyric.length - 1? 5: parsedLyric[index + 1].time - parsedL.time}s`,
      }"
      >{{parsedL.text || '---'}}</span></li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      // 歌词播放当前li的所有高度
      frontLisHeight: 0,
      ulHeight: 0
    }
  },
  mounted () {
    this.ulHeight = this.$refs.lisEl.offsetHeight
  },
  props: ['currentTime','playState'],
  computed: {
    ...mapState(['lyric']),
    // 原始数据
    parsedLyric () {
      return this.lyric.lrc.lyric
      // 转化为数组
      .split("\n")
      // 过滤掉最后一个空字符
      .filter(s => s)
      // 正则逐一匹配
      .map( item => {
        let match = item.match(
          /^\[(?<time>\d{2}:\d{2}\.\d{2,3})\] *(?<text>.*)$/im
        );
        return match.groups
      })
      .map( o => {
        // 加分钟和秒数正则分组
        let match = o.time.match(/(?<m>\d{2}):(?<s>\d{2}\.\d{2,3})/i);
        return {
          ...o,
          // 将歌曲时间化为秒速 【123.123】
          time: (match.groups.m*60+match.groups.s*1).toFixed(3),
        };
      });
    },
    // 翻译
    // 双语
    // 获取当前播放的歌词下标
    currentLyricIndex () {
      let index = this.parsedLyric.findIndex( o => o.time > this.currentTime);
      return index === -1 ? this.parsedLyric.length -1 : index -1 
    },
  },
  watch: {
    // 监视当前下标
    currentLyricIndex (n) {
      // 获取当前播放到的li标签 前面得所有li
      let frontLis = Array.prototype.slice.call(
        this.$refs.lisEl.querySelectorAll('li'),0,n
      );
      // 计算前面得所有li的高度和
      let frontLisHeight = frontLis.reduce( (total,liEl) => {
        return total + liEl.offsetHeight
      },0)
      this.frontLisHeight = -frontLisHeight + 'px'
    },

  }

};
</script>

<style lang="stylus" scoped>
@keyframes lyric {
  from {
    background-position-x: 100%;
  }
  to {
    background-position-x: 0%;
  }
}
  .iyric
    width 95vw
    height 70vh
    margin: 10px auto 0
    overflow: hidden
    mask-image: linear-gradient(
        to bottom,
        transparent 0% 5%,
        red 15% 85%,
        transparent 95% 100%
      );
    .content
      transition: transform .3s
      width 100%
      height 100%
      display: flex
      color: white
      flex-direction: column
      li
        display: inline-block
        line-height: 30px
        &.active
          span
          /* 行高 */
            background-image: linear-gradient(to right,rgb(226, 132, 255) 0% 48%,rgb(162, 255, 149) 52% 100%);
            background-size: 200%;
            background-position-x: 100%;
            -webkit-background-clip: text;
            color: transparent;
            animation: lyric 3s linear 0s;
            animation-play-state: running;
            &.aaa
              animation-play-state: paused
            
            
            

          
</style>