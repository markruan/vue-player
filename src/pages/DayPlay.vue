<template>
  <div>
     <van-nav-bar
      title="每日推荐"
      left-text="返回"
      fixed
      left-arrow
      @click-left="onClickLeft"
    
    />
    <van-image
      width="100%"
      style="margin-top: 46px;"
      :src="backgroundImg+'?param=320y180'"
    />
    <SongList :tracks="tracks" />
  </div>
</template>>
<script>
import SongList from "../components/SongList"
export default {
  name: "daliylist",
  data() {
    return {
      backgroundImg:'',
      tracks:[]

    };
  },
  components:{
    SongList
  },
  created() {
    this.backgroundImg=JSON.parse(localStorage.getItem("userinfo")).backgroundUrl
    this.getDayPlaylist();
  },
  methods: {
    async getDayPlaylist() { 
      const list = await this.$http.get("/recommend/songs");  
     this.tracks=list.data.data.dailySongs
    },
     onClickLeft(){
         this.$router.go(-1);//返回上一层
    },
  }
};
</script>>