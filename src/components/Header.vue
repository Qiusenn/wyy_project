<template>
  <div class="header" v-if="$route.meta.requiresAuth">
    <div class="download">
      <i class="iconfont icon-wangyiyunyinle icon-wyy"></i>
    </div>
    <div class="nav">
      <div><router-link to="/songrecommend" active-class="a_action">推荐音乐</router-link></div>
      <div><router-link to="/hot" active-class="a_action">热歌榜</router-link></div>
      <div><router-link to="/search" active-class="a_action">搜索</router-link></div>
      <div><router-link to="/hotList" active-class="a_action">热门榜单</router-link></div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="stylus" scoped>
  .header
    position: fixed
    top 0
    left: 0
    width 100%
    z-index 3
    background-color white
    .download
      position: relative
      width 100%
      height 84px
      background-color: #d43c33
      .icon-wyy
        color: white
        font-size: 27px
        position: absolute
        top 27px
        left 12px
      &::after
        position: absolute
        top 27px
        right 12px
        display: inline-block
        content: '下载APP'
        padding: 10px 20px
        border-radius: 20px
        font-size: 15px
        color: #d43c33
        background-color: white
    .nav
      display: flex
      box-shadow: 0 0 5px 0 #ccc
      div
        flex: 1
        height 100%
        text-align: center
        padding-top: 10px
        a 
          display: inline-block
          font-size: 15px
          color: black
          padding-bottom: 10px
          border-bottom: 2px solid transparentify
        .a_action
          border-bottom: 2px solid red
          color: red
</style>