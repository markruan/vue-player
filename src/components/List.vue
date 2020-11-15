<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <div  v-if="loading">
       <van-skeleton title avatar :row="1" v-for="item in 3" :key="item"/>
    </div>
    <div v-else>
    <van-cell  v-for="item in hotList" :key="item.id" :title="item.name" :label="item.copywriter?item.copywriter:item.trackCount+'首,'+'by '+item.creator.nickname" :to="'/list/'+item.id">
      <template #icon>
          
          <van-image
            :src="item.picUrl?item.picUrl+'?param=200y200':item.coverImgUrl+'?param=200y200'"
            :height="50"
            :width="50"
            lazy-load
            :loading-icon="require('../assets/loading.gif')"
            style="margin:0 6px;"
            />
      </template>
    </van-cell>
   </div>
  </van-list>
</template>
<script>
import {Skeleton} from "vant"
export default {
  name: "List",
  props: {
    hotList: {
      type: Array
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
   },
  watch:{
      hotList(old){
       this.onLoad() 
      }
  },
  components:{ 
    [Skeleton.name]:Skeleton

  },
  data() {
    return {
      loading: true,
      finished: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      // for (let i = 0; i < 10; i++) {
      //   this.list.push(this.list.length + 1);
      // }

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 1000);
    }
  }
};
</script>
<style>
.van-icon__image {
  height: 200px;
}
</style>