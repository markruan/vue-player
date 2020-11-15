<template>
  <div> 
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell title="歌单" value title-style="font-size:16px" />
      <van-cell
        @click="sengSongInfo(item)"
        v-for="item in tracks"
        :key="item.id"
        :title="item.name"
        :label="item.ar[0].name"
        />
    </van-list>
   </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  props: {
    tracks: {
      type: Array
    }
  },
  computed: {
    ...mapState(["currentIndex","playList","showAplayer",])
  },
  methods: {
	...mapActions([
		"setSongNameActions",
		"setDurationActions",
		"setSongIdActions",
		"setSongUrlActions",
		"setSongImgActions",
		"setSongArtistActions",
		"setCurrentTimeActions",
		"setPlayingActions",
		"setPlayListActions",
		"setShowAplayerActions",
		"setCurrentIndexActions"
	]),
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    sengSongInfo(item) {
        const id= item.id 
        this.setSongIdActions(id)
		this.setCurrentIndexActions(this.playList.length)
		this.setShowAplayerActions(true)

    }
  }
};
</script>