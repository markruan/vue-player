<template>
  <van-grid :column-num="2" :border="false">
    <van-grid-item v-for="item in mvList" :key="item.id" :to="'/mv/'+item.id" gutter=1 >
      <van-image
        height="100"
        fit="contain"
        lazy-load
        :src="item.cover+'?param=320y180'"
        :loading-icon="require('../assets/loading.gif')"
      />
      <span class="title van-multi-ellipsis--l2">{{item.name}}-{{item.artistName}}</span>
      
    </van-grid-item>
  </van-grid>
</template>
<script> 
export default {
  name: "Vlist",
  props: {
    mvList: {
      type: Array
    }
  },
  components:{
   
  },
  methods: {}
};
</script>>
<style scoped>
.title{
  font-size: 12px;
  height: 28px;
}
</style>>