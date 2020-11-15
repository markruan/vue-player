<template>
  <van-grid :column-num="3" :border="false">
    <van-grid-item v-for="value in listInfo" :key="value.id" :to="'/list/'+value.id">
      <van-image
        :src="picUrl(value.coverImgUrl)"
        lazy-load
        radius=5
        :loading-icon="require('../assets/loading.gif')"
        width="100%"
        fit="contain"
      />
      <span
        style="font-size:12px;height:32px;line-height:1.4"
        class="van-multi-ellipsis--l2"
      >{{value.name}}</span>
    </van-grid-item>
  </van-grid>
</template>>
<script>
export default {
  name: "list",
  data() {
    return {};
  },
  computed: {
    picUrl() {
      return function(data) {
        return data + "?param=150y150";
      };
    }
  },
  props: {
    listInfo: Array
  }
};
</script>