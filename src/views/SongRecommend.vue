<template>
  <div class="soongRecommend">
    <div class="Recommend_Hrader">编辑推荐</div>
    <div class="rebody">
      <div class="Recommend_body"
      @click="$router.push(`/songcarlist?id=${recommend.id}`)" 
      v-for="recommend in recommendSong" 
      :key="recommend.id"
      >
        <div class="pic">
          <img :src="recommend.picUrl+'?param=150y150'" alt="">
          <div class="described">
            <span><i class="iconfont icon-erji icon_erji"></i>{{(recommend.playCount/10000).toFixed(1)+'万'}}</span>
          </div>
        </div>
        <span class="ellipsiss">{{ recommend.name }}</span>
    </div>
    </div>
    <div class="Recommend_Hrader newest_header">最新音乐</div>
    <ul>

      <SongItem 
      v-for="(newest, index) in newestSong" 
      :song="newest" 
      @click.native="app($event,index)"  
      :key="newest.id" :index="index" 
      :isPlay="isPlay"
      :playState="playState"
      />

    </ul>
    <div class="footer">
      <i class="iconfont icon-wangyiyunyinle icon-wyy"></i>
      <div class="openApp">打开App,发现更多好音乐 ></div>
      <p>网易公司版权所有©1997-2021 杭州乐读科技有限公司运营</p>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import SongItem from '../components/SongItem'
export default {
  data() {
    return {
      isPlay: null,
    };
  },
  props: ['playState'],
  components: {SongItem},
  methods: {
    ...mapActions(['getRecommendSong', 'getNewestSong','UpdateCurrentSongList']),
    // 排他
    app (e,index) {
      // 将当前isPlay设置为当前点击的组件下标
      this.isPlay = index
    }
  },
  updated () {
    console.log(123);
    this.UpdateCurrentSongList(this.newestSong)
  },
  mounted () {
    this.getRecommendSong()
    this.getNewestSong()  
  }, 
  computed: {
    ...mapState(['recommendSong', 'newestSong','iconIsPlay']),
  },
};
</script>

<style lang="stylus" scoped>
.soongRecommend
  padding-bottom: 50px
  margin-top: 50px + 84
  .Recommend_Hrader 
    border-left: 2px solid red
    height 18px
    line-height: 18px
    padding-left: 10px
    font-size: 17px
    font-weight: 400
  ul
    margin-top: 15px
    padding-left: 15px
  .rebody 
    width 100%
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    .Recommend_body 
      margin-top: 15px
      width 33%
      display: flex
      flex-direction: column
      .pic
        position: relative
        .described
          position: absolute
          top 0
          right 0
          font-size: 12px
          color: white
      span 
        padding: 0 10px
        margin-top: 5px
        font-size: 13px
      img
        width 100%
        display: block
        vertical-align: middle
  .newest_header 
    margin-top: 20px

  .footer
    width 100%
    height 200px
    text-align: center
    box-sizing: border-box
    background: url('../../public/static/images/recommand_bg_2x.png') no-repeat
    .icon-wyy
      margin-top: 50px
      display: inline-block
      color: red
      font-size: 35px
    .openApp
      text-align: center
      line-height: 38px;
      border: 1px solid #d33a31;
      border-radius: 38px;
      font-size: 16px;
      color: #d33a31;
      margin: 15px 37px 5px
    p
      text-align: center
      color: #888;
      font-size: 12px;
      line-height: 16px
      transform: scale(.8)
    

  
</style>