<template>
  <div class="search">
    <div class="search_input">
      <span><i class="iconfont icon-sousuo"></i></span>
      <input @input="search_song()" @keyup.enter="searchKeySong()" type="text" placeholder="搜索歌曲、歌手、专辑" v-model="searchVal">
    </div>
    <div class="search_All" v-if="!searchVal.length">
      <!-- 热门搜索 -->
      <h6>热门搜索</h6>
      <ul class="search_hot" >
        <li v-for="(hot, index) in hotsong.hots" :key="index" @click="searchKeySong(hot)" >{{hot.first}}</li>
      </ul>

      <!-- 搜索记录 -->
      <ul class="search_record">
        <li><i class="iconfont icon-miaobiao icon_biao" style="fontSize:20px"></i><span>张杰</span><span class="del_search">X</span></li>
        <li><i class="iconfont icon-miaobiao icon_biao" style="fontSize:20px"></i><span>张杰</span><span class="del_search">X</span></li>
        <li><i class="iconfont icon-miaobiao icon_biao" style="fontSize:20px"></i><span>张杰</span><span class="del_search">X</span></li>
      </ul>
    </div>
    <div v-else class="search_info">

      <h3>搜索"{{searchVal}}"</h3>
      <ul v-if="!isShowKeySongs" class="SearchSuggest">
        <li v-for="song in searchSuggest.songs" @click="searchKeySong(song)" :key="song.id"><span><i class="iconfont icon-sousuo"></i></span>{{song.name}}</li>
      </ul>

      <ul v-else class="searchKeywordList">
        <SongItem
        v-for="(alikeSong,index) in alikeSongList" :key="alikeSong.id"
        :song="alikeSong" :index="index" 
        :playState="playState"
        :isPlay="isPlay"
        @click.native="app($event,index)"
        />
      </ul>
    </div>
  </div>
    
</template>

<script>
import {mapState, mapActions} from 'vuex'
import SongItem from '../components/SongItem.vue'
export default {
  data() {
    return {
      searchVal: '',
      isShowKeySongs: false,
      isPlay: null,
    }
  },
  props: ['playState'],
  components: {SongItem},
  computed: {
    ...mapState(['hotsong', 'searchSuggest','alikeSongList','currentPlaySongList'])
  },
  methods: {
    ...mapActions(['getHotSong','getAlikeSongList','UpdateCurrentSongList']),
    search_song () {
      this.$store.dispatch('getSearchSuggest',this.searchVal)
    },
      
    app (e,index) {
      // 将当前isPlay设置为当前点击的组件下标
      this.isPlay = index
  },
    // 搜索建议被点击获取请求数据，渲染页面
    searchKeySong (songs=this.searchVal) {
      // 获取当前关键词
      let name = songs.name || songs.first || this.searchVal
      if (songs.first) {
        this.searchVal = name
      }
      this.isShowKeySongs = true
      // 请求数据
      this.getAlikeSongList(name)

    }
  },
  watch: {
    // 监视表单值当输入框为空时，退出搜索关键词界面
    searchVal (n) {
      if (!n) {
        this.isShowKeySongs = false
      }
    },
    alikeSongList (n) {
      // console.log(n);
      this.UpdateCurrentSongList(n)
    }
  },
  mounted () {
    this.getHotSong()
  }

};
</script>

<style lang="stylus" scoped>
  .search
    padding-bottom: 50px
    overflow: hidden
    width 100%
    margin-top: 70px + 84
    .search_input
      width 100%
      text-align: center
      border-bottom: 1px solid #EBECEC
      padding-bottom: 20px
      position: relative
      input
        box-sizing: border-box
        width 95%
        outline: none
        border-radius: 15px
        font-size: 13px
        background-color: #EBECEC
        color: #ccc
        padding: 10px 0
        padding-left: 30px
      span
        // z-index 3
        position: absolute
        top: 9px;
        left: 15px;
        content: ''
        display: block
        width 20px
        height 20px
    h6
      font-size: 16px
      color: #898683
      margin: 15px 0 10px 15px

    .search_hot
      display: flex
      flex-wrap: wrap
      padding-left: 10px
      li
        border: 1px solid #EBECEC
        padding: 10px
        margin: 3px
        border-radius: 20px

    .search_record
      margin-top: 20px
      padding-left: 40px
      li 
        position: relative
        display: flex
        justify-content: space-between
        border-bottom: 1px solid #EBECEC
        margin-bottom: 10px
        padding-bottom: 15px
        .del_search
          margin-right: 10px
          color: #ccc
        .icon_biao 
          position: absolute
          top 0
          left -29px

    .search_info 
      h3
        height: 50px;
        margin-left: 10px;
        padding-right: 10px;
        font-size: 15px;
        line-height: 50px;
        color: #507daf;
        border-bottom: 1px solid #EBECEC
      .SearchSuggest
        padding-left: 30px
        li 
          position: relative
          padding: 15px 0
          color: black
          border-bottom: 1px solid #EBECEC
          span
            position: absolute
            top 17px
            left -22px
      .searchKeywordList
        padding-left: 10px

</style>