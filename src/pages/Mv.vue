<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-loading
      type="circular"
      color="#1989fa"
      vertical
      v-show="!video.url"
      size="24px"
      style="margin-top:30px"
    ></van-loading>
    <span v-if="video.url">
      <vueMiniPlayer
        ref="vueMiniPlayer"
        :autoplay="true"
        :video="video"
        :mutex="true"
        @fullscreen="handleFullscreen"
      />
    </span>

    <van-cell
      v-show="video.url"
      title="MV信息"
      :value="MvDetail.publishTime"
      size="large"
      :label="MvDetail.name+'-'+MvDetail.artistName"
    />
  </div>
</template>
<script>
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
  data() {
    return {
      MvDetail: {},
      video: {
        url: "",
        cover: "",
        muted: false,
        loop: false,
        preload: "auto",
        poster: "",
        volume: 1,
        autoplay: false
      }
    };
  },
  created() {},
  props: {
    name: {
      type: String
    }
  },
  mounted() {
    console.log("this is current player instance object", this.player);
    this.getMvDetail();
    this.openMv();
  },
  computed: {
    // player() {
    //   return this.$refs.videoPlayer.player;
    // }
  },
  methods: {
    openMv() {
      const this_ = this;
      this.$http 
        .get("/mv/url", { params: { id: this.$route.params.id } }) 
        .get(this.host + "/mv/url", { params: { id: this.$route.params.id } }) 
        .then(function(response) {
          this_.video.url = response.data.data.url;
        })
        .catch(function(error) {});
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    getMvDetail() {
      const this_ = this;
      this.$http 
        .get("/mv/detail", {  
          params: { mvid: this.$route.params.id }
        })
        .then(response => {
          this_.MvDetail = response.data.data;
          this_.video.cover = this_.MvDetail.cover + "?param=320y180";
          console.log(this_.MvDetail);
        })
        .catch(error => {});
    },
    handleFullscreen() {}
  }
};
</script>
 
<style scoped>
/* .play-button {
  　　width: 72px;
  height: 72px;
  border-radius: 100%;
  z-index: 100;
  background-color: #ffffff;
  border: solid 1px #979797;
} */
</style>
 