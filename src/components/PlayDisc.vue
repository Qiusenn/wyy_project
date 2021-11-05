<template>
  <div class="disc">
    <div class="pointer" :class="{pointer_a:playState}"></div>
    <div class="dta" :class="{dta_a:!playState}">
      <div class="songDisc" v-if="receSong.song" :style="{backgroundImage:'url('+receSong.picUrl+')'}"></div>
      <div class="songDisc" v-else-if="receSong.al.name" :style="{backgroundImage:'url('+receSong.al.picUrl+')'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['receSong','playState']
};
</script>

<style lang="stylus" scoped>
  @keyframes rototaDic {
    from{
      transform: rotate(0deg)
    }
    to{
      transform: rotate(360deg)
    }
  }
  .disc
    margin: 0 auto 0
    width 95vw
    height 70vh
    position: relative    
    .pointer 
      position: absolute
      top -90px
      left 195px
      background: url('../../public/static/images/dvn.png') no-repeat
      width 250px
      height 250px
      z-index: 6
      background-size: 100px auto
      transform-origin: 12px 23px
      transition: all .5s
      &.pointer_a
        transform: rotate(-20deg)
    .dta
      animation: rototaDic 9s linear infinite
      display: flex
      justify-content: center
      align-items: center
      margin: 100px auto 0
      background: url('../../public/static/images/dta.png') no-repeat rgba(255, 255, 255, 0.2)
      background-size: 100% auto
      width 250px
      height 250px
      border-radius: 50%
      &.dta_a
        animation-play-state: paused
      .songDisc
        width 150px
        height 150px
        border-radius: 50%
        background-size: 100% auto
    
</style>