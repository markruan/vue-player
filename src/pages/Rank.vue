<template>
  <div class="rank">
    <van-nav-bar title="排行榜" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
      <div v-show="!rankInfo.length" class="load">
      <van-loading size="24px" color="#1989fa">加载中...</van-loading>
    </div>
    <div class="rankContent" v-show="rankInfo.length"> 
      <h4 class="title">官方榜</h4>
    <div
        @click="rankClick(item.id)"
        class="officialBox"
        v-for="(item,index) in rankInfo.slice(0,4)"
        :key="index"
      >
        <div class="rankPic">
          <van-image width="6rem" height="6rem" fit="cover" radius="5" :src="item.coverImgUrl" />
          <!-- <p class="updateTime">{{item.updateTime}}</p> -->
        </div>
        <div class="rankInfo">
          <p
            class="van-ellipsis" 
            v-for="(value,indey) in item.tracks"
            :key="value.id"    
          >{{indey+1}}.{{value.first}}—{{value.second}}</p>
        </div>
      </div>
      <div class="recommendRank">
        <h4>推荐榜</h4>
        <ImgList :listInfo="rankInfo.slice(5,32)" />
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import ImgList from "../components/3list";
export default {
  data() {
    return {
      rankInfo: []
    };
  },
  components: {
    ImgList
  },
  created() {
    this.getRankInfo();
  },
  methods: {
    rankClick(id) {
      this.$router.push("/list/" + id);
    },
    async getRankInfo() {
      const res = await this.$http.get("toplist/detail", { params: {} });

      if (res.data.code == 200) {
        let list = res.data.list;
        list.forEach(item => {
          const info = {
            coverImgUrl: item.coverImgUrl,
            updateTime: item.updateFrequency,
            id: item.id,
            tracks: item.tracks,
            name: item.name
          };

          this.rankInfo.push(info);
        });
      } else {
        // Toast('登录错误')
      }
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>>
<style scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    Segoe UI, Arial, Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft Yahei", sans-serif;
}

h4,
.officialBox {
  display: flex;
  margin-left: 10px;
}
p {
  text-overflow: ellipsis;
  margin: 5px;
  color: #a7a6a7;
  display: block;
  font-size: 14px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.rankInfo {
  overflow: hidden;
  margin-left: 10px;
}
.rankInfo :first-child {
  margin: 0;
} 
.load {
  padding-top: 55px;
  text-align: center;
}
.title{
  padding-top: 40px
} 
</style>>