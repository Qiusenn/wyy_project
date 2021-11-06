<template>
  <div class="songList">
    <div class="maskBg" @click="$emit('uptada:showSongList',false)"></div>
   <transition name="slib">
    <ul class="list">
      <SongItem
      v-for="(newest, index) in currentPlaySongList" 
      :key="newest.id"
      @click.native="app($event,index)"  
      :index="index" 
      :playState="playState"
      :song="newest" 
      :isPlay="isPlay"
      />
    </ul>
   </transition>
  </div>
</template>

<script>
import SongItem from './SongItem.vue'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      isPlay: null,
    };
  },
  props: ['showSongList','playState'],
  components: {SongItem},
  computed: {
    ...mapState(['currentPlaySongList'])
  },
  methods: {
    app (e,index) {
      // 将当前isPlay设置为当前点击的组件下标
      this.isPlay = index
    }
  }
};
</script>

<style lang="stylus" scoped>
.slib-enter-active, .slib-leave-active
  transition: transform .5s
.slib-enter, .slib-leave-to
  transform: translateY(400px)
.songList
    z-index: 4
    position: fixed
    width 100vw
    height 100vh
    top 0
    left 0
  .maskBg
    position: absolute
    top 0
    left 0
    width 100vw
    height 100vh
    background-color: rgba(0,0,0,.5)
  .list
    overflow-y: scroll
    width 95%
    position: absolute
    height 70%
    z-index: 6
    border-top-right-radius: 20px
    border-top-left-radius: 20px
    bottom: 0
    left: 50%
    transform: translateX(-50%)
    background-color: white
    box-sizing: border-box
    padding: 10px
</style>