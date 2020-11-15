<template>
 
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(image, index) in picList" :key="index">
     
      <img :src="image" width="100%" />
    
    </van-swipe-item>
  </van-swipe>
   
</template>

<script> 
export default {
  name: "Tabb",
  props: {
    picList: {
      type: Array
    }
  },
 
  created() {
    
  },
  data() {
    return {};
  }
};
</script>