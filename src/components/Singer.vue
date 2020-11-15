<<<<<<< HEAD
<template>

	<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		<van-cell v-for="item in singerList" :height=40 :key="item.id">
			<template #title style="margin-top:30px;">
				<span class="custom-title">{{item.name}}</span>
			</template>
			<template #icon>
				<van-image :src="item.picUrl+'?param=200y200'" :height=70 :width=70 :loading-icon="require('../assets/loading.gif')"
  round lazy-load style="margin:0 6px;" />
			</template>
		</van-cell>
	</van-list>


</template>
<script>
	export default {
		name: 'singer',
		props: {
			singerList: {
				type: Array
			}
		},
		created() {
			console.log(this.props)
		},

		data() {
			return {
				loading: false,
				finished: false,
			}
		},
		methods: {
			onLoad() {
				// 异步更新数据
				// 加载状态结束
				this.loading = false;

				// 数据全部加载完成
				//     if (this.list.length >= 40) {
				//       this.finished = true;
				//     }
				//   }, 1000);
			},
		}
	}
</script>
<style>
	.custom-title {
		line-height: 55px;
		margin-left: 10px;
	}
</style>
=======
<template>
  
    <van-list
        
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell 
        v-for="item in singerList" 
        :height=40
        :key="item.id" 
         >
          <template #title style="margin-top:30px;">
                <span class="custom-title">{{item.name}}</span>
          </template>
          <template #icon>
                <van-image 
                :src="item.picUrl+'?param=200y200'" 
                :height=70 
                :width=70 
                :loading-icon="require('../assets/loading.gif')"
                round lazy-load style="margin:0 6px;"/>
          </template>
         </van-cell>
         </van-list>

   
</template>
<script> 
    export default { 
        name: 'singer',
        props:{
            singerList:{
                type:Array
            }
        },
        created(){
          console.log(this.props)  
        },
    
        data () {
            return {
          
              loading: false,
              finished: false,
            }
        },
        methods:{
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
    },
        }
    }
</script>
<style>
      .custom-title{
          line-height: 55px;
          margin-left: 10px;
      }
</style>
>>>>>>> ccd475819d87add24b33c1ff4e303ffe966121d6
