<template>
  <div class="hot">
    <div class="hot_bg_out">
      <div class="hot_bg_in"></div>
      <div class="updata">更新日期10月11</div>
    </div>
    <ul>
      <!-- <li v-for="(newest,index) in newestSong" :key="newest.id">
        <span class="number">{{index++ >= 9? index++:'0'+index++}}</span>
        <div>
          <h5>{{ newest.name }}</h5>
          <div>
            <i class="sghot"></i>
            <span>{{ newest.artist.name }}</span>
          </div>
        </div>
        <span><i class="iconfont icon-bofang"></i></span>
      </li> -->
      <SongItem
      v-for="(newest, index) in newestSong" 
      :song="newest" 
      @click.native="app($event,index)"  
      :key="newest.id" :index="index" 
      :isPlay="isPlay"
      :playState="playState"
      ><span class="number">{{index++ >= 9? index++:'0'+index++}}</span></SongItem>
    </ul>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import SongItem from '../components/SongItem'
export default {
  props: ['playState'],
  components: {
    SongItem
  },
  data() {
    return {
      isPlay: null,
    };
  },
  methods: {
    ...mapActions(['getRecommendSong', 'getNewestSong']),
    // 排他
    app (e,index) {
      index = index - 2
      // 将当前isPlay设置为当前点击的组件下标
      this.isPlay = index
    }
  },
  mounted () {  
    this.getRecommendSong()
    this.getNewestSong()
  },
  computed: {
    ...mapState(['recommendSong', 'newestSong'])
  }
};
</script>

<style lang="stylus" scoped>
  .hot
    overflow: hidden
    padding-bottom: 50px
    margin-top: 43px + 84
    .hot_bg_out
      position: relative
      height 160px
      background: url('../../public/static/images/bg.jpg') no-repeat
      background-size: 100% auto
      .updata
        position: absolute
        top 95px
        left 31px
        color white
        font-size: 13px
        font-weight: 500
      .hot_bg_in
        position: absolute
        top 20px
        left 23px
        height 67px
        width 142px
        background: url('../../public/static/images/bg2.png') no-repeat
        background-size: 100% auto
        background-position: -12px -21px
    ul
      padding-left: 15px
</style>