<template>
  <div>
<<<<<<< HEAD
    <van-nav-bar :title="geDanInfo.name" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
    <div v-show="!imageIsLoad" class="load">
      <van-loading size="24px"  color="#1989fa" >加载中...</van-loading>
    </div>
    <div  v-show="imageIsLoad">
      <van-image
      width="100%"
      style="margin-top: 46px;"
      :src="geDanInfo.coverImgUrl+'?param=320y180'"
      @load="imgload"
    />
    <SongList :tracks="tracks" />
    </div>
    
  </div>
=======
    <van-nav-bar
      :title="geDanInfo.name"
      left-text="返回"
      fixed
      left-arrow
      @click-left="onClickLeft"
     />
    <van-image
        width="100%"
        style="margin-top: 46px;"
        :src="geDanInfo.coverImgUrl+'?param=320y180'"
      />
   <SongList :tracks="tracks" />
  </div>  
>>>>>>> ccd475819d87add24b33c1ff4e303ffe966121d6
</template>>
<script>
import SongList from "../components/SongList";
import { mapState, mapActions } from "vuex";
export default {
  name: "GeDanList",
  data() {
    return {
      geDanInfo: {},
      tracks: [],
      playlist: [],
      imageIsLoad:false
    };
  },
  components: {
    SongList
  },
  created() {
    this.getDetail();
  },
  methods: {
    ...mapActions(["setPlayListActions"]),
    imgload(){
      this.imageIsLoad=true
    },
    getDetail() {
      this.$http
        .get("/playlist/detail", {
          params: { id: this.$route.params.id }
        })
        .then(response => {
          this.geDanInfo = response.data.playlist;
          this.tracks = response.data.playlist.tracks;
          var info = {};
          for (const item of this.tracks) {
            info.songId = item.id;
            info.songName = item.name;
            info.songArtist = item.ar[0].name;
            info.songImg = item.al.picUrl;
            this.playlist.push(info);
          }
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style   scoped>
.load {
        padding-top: 55px;
        text-align: center;
    }
</style>